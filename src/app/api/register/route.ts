import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { registrationSchema } from '@/lib/validation'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

// Limit request body size to 50KB to prevent memory exhaustion / DoS
const MAX_BODY_BYTES = 50 * 1024

export async function POST(request: NextRequest) {
  try {
    // 1. Content-Length check
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Payload too large. Maximum request size is 50KB.' },
        { status: 413 }
      )
    }

    // 2. Distributed Rate Limiting (5 requests per 10 minutes per IP)
    const clientIp = getClientIp(request)
    const rateLimit = await checkRateLimit(`register:${clientIp}`, {
      maxRequests: 5,
      windowSeconds: 600,
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            'Too many registration attempts from this network. Please wait a few minutes before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetInSeconds),
          },
        }
      )
    }

    // 3. Safe JSON Parsing
    let rawBody: unknown
    try {
      rawBody = await request.json()
    } catch {
      return NextResponse.json({ error: 'Malformed or invalid JSON payload.' }, { status: 400 })
    }

    // 4. Strict Schema Validation with Zod
    const validationResult = registrationSchema.safeParse(rawBody)
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of validationResult.error.issues) {
        const path = issue.path.join('.')
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      return NextResponse.json(
        {
          error: 'Please correct the validation errors in the form.',
          fieldErrors,
        },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // 5. Database Insertion via Supabase Server Client
    // Generate UUID server-side so insert requires only INSERT privileges under strict RLS
    const registrationId = crypto.randomUUID()
    const supabase = await createClient()
    const { error } = await supabase
      .from('registrations')
      .insert({
        id: registrationId,
        full_name: validData.full_name,
        student_id: validData.student_id,
        email: validData.email,
        phone: validData.phone,
        department: validData.department,
        academic_year: validData.academic_year,
        team_status: validData.team_status,
        team_name: validData.team_name,
        interest: validData.interest,
      })

    if (error) {
      // Handle Unique Constraint Violation (23505) without leaking whether student_id or email collided
      if (error.code === '23505') {
        return NextResponse.json(
          {
            error:
              'A registration with these credentials already exists. If you need to make changes, please contact the organizing committee.',
          },
          { status: 409 }
        )
      }

      // Safe server-side technical error logging for Vercel Runtime Logs (no PII or secrets)
      console.error('Supabase registration insertion failure:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
      })

      return NextResponse.json(
        {
          error: 'Unable to complete your registration at this time. Please try again later.',
        },
        { status: 500 }
      )
    }

    const reference = registrationId.split('-')[0].toUpperCase()
    return NextResponse.json(
      {
        success: true,
        reference,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Unexpected registration error occurred:', err instanceof Error ? err.message : 'Unknown')
    return NextResponse.json(
      {
        error: 'An unexpected server error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
