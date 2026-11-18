import { Resend } from 'resend'

interface RegistrationEmailData {
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

const teamStatusLabels: Record<string, string> = {
  has_team: 'Already have a team',
  looking_for_team: 'Looking for teammates on campus',
  want_to_learn: 'Attending workshops / Learning before joining',
}

export function generateConfirmationEmailHtml(data: RegistrationEmailData): string {
  const statusText = teamStatusLabels[data.team_status] || data.team_status
  const currentYear = new Date().getFullYear()

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmed — HULT PRIZE AASTU</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #150007; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(41, 37, 99, 0.08); border: 1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #292563; padding: 36px 30px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <!-- Brand Lockup -->
                    <div style="display: inline-block; padding: 6px 16px; background-color: rgba(255, 50, 155, 0.15); border: 1px solid rgba(255, 50, 155, 0.35); border-radius: 9999px; margin-bottom: 12px;">
                      <span style="color: #FF329B; font-weight: 800; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">OFFICIAL CAMPUS REGISTRATION</span>
                    </div>
                    <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 900; margin: 0 0 6px 0; letter-spacing: 0.5px; text-transform: uppercase;">
                      HULT PRIZE <span style="color: #FF329B;">AASTU</span>
                    </h1>
                    <p style="color: #E2E8F0; font-size: 13px; margin: 0; font-weight: 500;">
                      Addis Ababa Science and Technology University
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="color: #292563; font-size: 20px; font-weight: 800; margin: 0 0 16px 0;">
                Dear ${data.full_name},
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 16px 0;">
                Thank you for registering for <strong>HULT PRIZE AASTU</strong>!
              </p>

              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 24px 0;">
                We are excited to have you interested in joining our entrepreneurship and innovation community. Your registration has been received successfully.
              </p>

              <!-- Reference Badge -->
              <table role="presentation" width="100%" style="background-color: #FFF0F7; border: 1px solid rgba(255, 50, 155, 0.25); border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; text-align: center;">
                    <div style="font-size: 11px; font-weight: 700; color: #8A2890; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Registration Reference Code</div>
                    <div style="font-size: 24px; font-weight: 900; color: #FF329B; font-family: monospace; letter-spacing: 2px;">${data.reference_id}</div>
                  </td>
                </tr>
              </table>

              <!-- Registration Details Card -->
              <table role="presentation" width="100%" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <h3 style="color: #292563; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 14px 0; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">
                      Registration Details
                    </h3>
                    <table role="presentation" width="100%" style="font-size: 13px; line-height: 1.8;">
                      <tr>
                        <td width="38%" style="color: #64748B; font-weight: 600;">Full Name:</td>
                        <td width="62%" style="color: #1E293B; font-weight: 700;">${data.full_name}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Student ID:</td>
                        <td style="color: #1E293B; font-weight: 700; font-family: monospace;">${data.student_id}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Department / Major:</td>
                        <td style="color: #1E293B; font-weight: 700;">${data.department}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Academic Year:</td>
                        <td style="color: #1E293B; font-weight: 700;">${data.academic_year}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B; font-weight: 600;">Participation Status:</td>
                        <td style="color: #1E293B; font-weight: 700;">${statusText}</td>
                      </tr>
                      ${
                        data.team_name
                          ? `<tr>
                        <td style="color: #64748B; font-weight: 600;">Team Name:</td>
                        <td style="color: #1E293B; font-weight: 700;">${data.team_name}</td>
                      </tr>`
                          : ''
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <h3 style="color: #292563; font-size: 16px; font-weight: 800; margin: 0 0 10px 0;">
                What happens next?
              </h3>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 12px 0;">
                Our organizing team will share further information about upcoming activities, orientation sessions, team-matching workshops, and competition rules through the contact information you provided.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #292563; font-weight: 700; margin: 0 0 24px 0;">
                Stay tuned and get ready to turn your ideas into impact!
              </p>

              <!-- Sign-off -->
              <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 14px; line-height: 1.6; color: #334155;">
                <p style="margin: 0 0 4px 0;">Best regards,</p>
                <p style="margin: 0; font-weight: 800; color: #292563;">HULT PRIZE AASTU Organizing Team</p>
                <p style="margin: 0; font-size: 12px; color: #64748B;">Addis Ababa Science and Technology University</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F1F5F9; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
              <p style="font-size: 11px; color: #64748B; margin: 0 0 6px 0;">
                This email was sent to ${data.email} because you submitted a registration for HULT PRIZE AASTU.
              </p>
              <p style="font-size: 11px; color: #94A3B8; margin: 0;">
                © ${currentYear} HULT PRIZE AASTU • Addis Ababa Science and Technology University
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export async function sendRegistrationConfirmationEmail(
  data: RegistrationEmailData
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn(
      '[HULT PRIZE AASTU Email] RESEND_API_KEY is not configured in environment variables. Email notification skipped safely.'
    )
    return {
      success: false,
      error: 'RESEND_API_KEY not configured',
    }
  }

  // Use configured sender or fallback to Resend onboarding address
  const fromEmail = process.env.EMAIL_FROM || 'HULT PRIZE AASTU <onboarding@resend.dev>'

  try {
    const resend = new Resend(apiKey)
    const html = generateConfirmationEmailHtml(data)

    const response = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Registration Confirmed — HULT PRIZE AASTU',
      html,
    })

    if (response.error) {
      console.error(
        '[HULT PRIZE AASTU Email] Resend delivery error:',
        response.error.name,
        response.error.message
      )
      return {
        success: false,
        error: response.error.message,
      }
    }

    console.log(
      `[HULT PRIZE AASTU Email] Confirmation email sent successfully to ${data.email} (Email ID: ${response.data?.id})`
    )
    return {
      success: true,
      id: response.data?.id,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email sending error'
    console.error('[HULT PRIZE AASTU Email] Unexpected error while sending confirmation email:', message)
    return {
      success: false,
      error: message,
    }
  }
}
