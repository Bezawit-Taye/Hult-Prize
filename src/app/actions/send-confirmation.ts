'use server'

import { sendRegistrationConfirmationEmail } from '@/lib/email'

interface ConfirmationPayload {
  full_name: string
  student_id: string
  email: string
  phone?: string
  department: string
  academic_year: string
  team_status: string
  team_name?: string | null
  reference_id: string
}

export async function sendConfirmationAction(payload: ConfirmationPayload) {
  try {
    const result = await sendRegistrationConfirmationEmail(payload)
    return result
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to send confirmation email'
    console.error('[Action: sendConfirmationAction] Error:', msg)
    // Always return gracefully so client registration is never broken
    return { success: false, error: msg }
  }
}
