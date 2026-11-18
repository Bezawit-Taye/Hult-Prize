import { z } from 'zod'

/**
 * Sanitizes untrusted user text by:
 * - Trimming leading/trailing whitespace
 * - Removing ASCII control characters (except standard newlines/tabs)
 * - Removing null bytes
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
    .trim()
}

/**
 * Academic years supported by AASTU
 */
export const ACADEMIC_YEARS = [
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Postgraduate',
] as const

/**
 * Team participation statuses
 */
export const TEAM_STATUSES = ['has_team', 'looking_for_team', 'want_to_learn'] as const

/**
 * Strict schema for registration submission validation
 */
export const registrationSchema = z
  .object({
    full_name: z
      .string()
      .transform(sanitizeText)
      .pipe(
        z
          .string()
          .min(2, 'Full name must be at least 2 characters.')
          .max(100, 'Full name cannot exceed 100 characters.')
          .regex(/^[a-zA-Z\s'.\-]+$/, 'Full name contains invalid characters.')
      ),

    student_id: z
      .string()
      .transform((val) => sanitizeText(val).toUpperCase().replace(/\s+/g, '').replace(/\\/g, '/'))
      .pipe(
        z
          .string()
          .length(10, 'Student ID must follow the format ETS0000/00 (e.g. ETS1234/16).')
          .regex(/^ETS\d{4}\/\d{2}$/, 'Student ID must follow the format ETS0000/00 (e.g. ETS1234/16).')
      ),

    email: z
      .string()
      .transform((val) => sanitizeText(val).toLowerCase())
      .pipe(
        z
          .string()
          .min(5, 'Email address is required.')
          .max(120, 'Email address cannot exceed 120 characters.')
          .email('Please enter a valid email address (e.g. name@gmail.com or name@aastu.edu.et).')
      ),

    phone: z
      .string()
      .transform(sanitizeText)
      .pipe(
        z
          .string()
          .min(7, 'Phone number must be at least 7 digits.')
          .max(20, 'Phone number cannot exceed 20 characters.')
          .regex(/^[+\d\s\-().]{7,20}$/, 'Please enter a valid phone number.')
      ),

    department: z
      .string()
      .transform(sanitizeText)
      .pipe(
        z
          .string()
          .min(2, 'Department / Major is required.')
          .max(100, 'Department cannot exceed 100 characters.')
      ),

    academic_year: z.enum(ACADEMIC_YEARS, {
      message: 'Please select a valid academic year.',
    }),

    team_status: z.enum(TEAM_STATUSES, {
      message: 'Please choose a valid team participation option.',
    }),

    team_name: z
      .string()
      .max(100, 'Team name cannot exceed 100 characters.')
      .optional()
      .nullable()
      .transform((val) => {
        if (!val) return null
        const cleaned = sanitizeText(val)
        return cleaned.length > 0 ? cleaned : null
      }),

    interest: z
      .string()
      .max(1000, 'Interest description cannot exceed 1000 characters.')
      .optional()
      .nullable()
      .transform((val) => {
        if (!val) return null
        const cleaned = sanitizeText(val)
        return cleaned.length > 0 ? cleaned : null
      }),
  })
  .strict()

export type ValidatedRegistrationInput = z.infer<typeof registrationSchema>
