import { NextResponse } from 'next/server'
import { sendRegistrationConfirmationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body || !body.email || !body.full_name || !body.student_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required registration details' },
        { status: 400 }
      )
    }

    const result = await sendRegistrationConfirmationEmail({
      full_name: body.full_name,
      student_id: body.student_id,
      email: body.email,
      phone: body.phone,
      department: body.department,
      academic_year: body.academic_year,
      team_status: body.team_status,
      team_name: body.team_name,
      reference_id: body.reference_id,
    })

    return NextResponse.json(result)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error'
    console.error('[API: /api/send-confirmation] Error:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
