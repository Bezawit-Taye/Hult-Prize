'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle2, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { sendConfirmationAction } from '@/app/actions/send-confirmation'

type TeamStatus = 'has_team' | 'looking_for_team' | 'want_to_learn' | ''

type FormData = {
  full_name: string
  student_id: string
  email: string
  phone: string
  department: string
  academic_year: string
  team_status: TeamStatus
  team_name: string
  interest: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialData: FormData = {
  full_name: '',
  student_id: '',
  email: '',
  phone: '',
  department: '',
  academic_year: '',
  team_status: '',
  team_name: '',
  interest: '',
}

export default function RegistrationForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!data.full_name.trim()) e.full_name = 'Full name is required.'
    if (!data.student_id.trim()) e.student_id = 'Student ID is required.'
    if (!data.email.trim()) {
      e.email = 'University email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!data.phone.trim()) {
      e.phone = 'Phone number is required.'
    } else if (!/^[+\d\s\-().]{7,20}$/.test(data.phone)) {
      e.phone = 'Please enter a valid phone number.'
    }
    if (!data.department.trim()) e.department = 'Department / Major is required.'
    if (!data.academic_year) e.academic_year = 'Academic year is required.'
    if (!data.team_status) e.team_status = 'Please choose a team participation option.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (key: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!validate()) return

    setLoading(true)
    try {
      // 1. Save registration in Supabase database
      const supabase = createClient()
      const { data: result, error } = await supabase
        .from('registrations')
        .insert({
          full_name: data.full_name.trim(),
          student_id: data.student_id.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone.trim(),
          department: data.department.trim(),
          academic_year: data.academic_year,
          team_status: data.team_status,
          team_name: data.team_name.trim() || null,
          interest: data.interest.trim() || null,
        })
        .select('id')
        .single()

      if (error) {
        if (error.code === '23505') {
          setSubmitError(
            'A registration with this Student ID or email already exists. Please verify your details or contact the HULT PRIZE AASTU team.'
          )
        } else {
          setSubmitError(
            'Unable to process registration. Please check your connection or try again.'
          )
        }
        return
      }

      const ref = result.id.split('-')[0].toUpperCase()

      // 2. Trigger automatic confirmation email via server action
      // CRITICAL: Email failure must NOT block registration success or revert database
      try {
        await sendConfirmationAction({
          full_name: data.full_name.trim(),
          student_id: data.student_id.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone.trim(),
          department: data.department.trim(),
          academic_year: data.academic_year,
          team_status: data.team_status,
          team_name: data.team_name.trim() || null,
          reference_id: ref,
        })
      } catch (emailErr) {
        // Safe server-side log, student is not blocked
        console.warn('[RegistrationForm] Email delivery notification non-fatal error:', emailErr)
      }

      // 3. Display registration success screen with reference code
      setSuccess(ref)
    } catch {
      setSubmitError('An unexpected network error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (key: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none font-medium ${
      errors[key]
        ? 'border-brand-red bg-red-50/50 text-brand-ink focus:ring-2 focus:ring-brand-red/20'
        : 'border-slate-200 bg-white text-brand-midnight placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20'
    }`

  if (success) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-brand-green/15 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-brand-midnight mb-2">
          Registration Successful!
        </h2>
        <div className="inline-block mb-4">
          <span className="text-xs font-bold text-brand-pink tracking-widest uppercase bg-brand-pink/10 px-3 py-1 rounded-full border border-brand-pink/25">
            HULT PRIZE AASTU
          </span>
        </div>
        <p className="text-brand-midnight/70 leading-relaxed text-sm sm:text-base max-w-md mx-auto mb-6">
          Thank you for registering for <strong>HULT PRIZE AASTU</strong>! Your registration has been received
          successfully. A confirmation email has been dispatched to your email address.
        </p>

        <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 mb-8">
          <p className="text-xs uppercase tracking-wider font-semibold text-brand-midnight/50 mb-1">
            Your Registration Reference
          </p>
          <p className="text-2xl font-black text-brand-pink tracking-widest font-mono">
            {success}
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-midnight text-white rounded-xl font-bold hover:bg-brand-midnight-light transition-all duration-200 shadow-md shadow-brand-midnight/10 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to HULT PRIZE AASTU Homepage</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-10 space-y-8"
    >
      {submitError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-brand-red/20 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-brand-red">{submitError}</p>
        </div>
      )}

      {/* Section 1: Personal Information */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
          <span className="w-2 h-2 rounded-full bg-brand-pink" />
          <h3 className="text-base font-extrabold text-brand-midnight">
            Personal Information
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
              Full Name <span className="text-brand-pink">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Abebe Kebede"
              className={inputClass('full_name')}
              value={data.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
            />
            {errors.full_name && (
              <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.full_name}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Student ID <span className="text-brand-pink">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ETS1234/13"
                className={inputClass('student_id')}
                value={data.student_id}
                onChange={(e) => handleChange('student_id', e.target.value)}
              />
              {errors.student_id && (
                <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.student_id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                University Email <span className="text-brand-pink">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. student@aastu.edu.et"
                className={inputClass('email')}
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Phone Number <span className="text-brand-pink">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. +251 91 234 5678"
                className={inputClass('phone')}
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Department / Major <span className="text-brand-pink">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineering / Architecture"
                className={inputClass('department')}
                value={data.department}
                onChange={(e) => handleChange('department', e.target.value)}
              />
              {errors.department && (
                <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.department}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
              Academic Year <span className="text-brand-pink">*</span>
            </label>
            <select
              className={inputClass('academic_year')}
              value={data.academic_year}
              onChange={(e) => handleChange('academic_year', e.target.value)}
            >
              <option value="">Select your academic year</option>
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Pre-Engineering / Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year</option>
              <option value="5th Year">5th Year (Senior / Finalist)</option>
              <option value="Graduate">Postgraduate / Masters</option>
            </select>
            {errors.academic_year && (
              <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.academic_year}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Participation Information */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-5 border-b border-slate-100">
          <span className="w-2 h-2 rounded-full bg-brand-purple" />
          <h3 className="text-base font-extrabold text-brand-midnight">
            Participation Information
          </h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-2.5">
              Do you currently have a team? <span className="text-brand-pink">*</span>
            </label>
            <div className="space-y-2.5">
              {[
                { value: 'has_team', label: 'Yes, I already have a team formed.' },
                { value: 'looking_for_team', label: 'No, I am looking for teammates at AASTU.' },
                { value: 'want_to_learn', label: 'I want to attend workshops and learn more before joining.' },
              ].map((opt) => {
                const isSelected = data.team_status === opt.value
                return (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-brand-pink bg-brand-pink-light/60 text-brand-midnight shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-brand-midnight/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="team_status"
                      value={opt.value}
                      checked={isSelected}
                      onChange={(e) => handleChange('team_status', e.target.value)}
                      className="w-4 h-4 text-brand-pink focus:ring-brand-pink accent-brand-pink"
                    />
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </label>
                )
              })}
            </div>
            {errors.team_status && (
              <p className="mt-1.5 text-xs font-semibold text-brand-red">{errors.team_status}</p>
            )}
          </div>

          {data.team_status === 'has_team' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Team Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. AASTU Innovators"
                className={inputClass('team_name')}
                value={data.team_name}
                onChange={(e) => handleChange('team_name', e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
              What interests you most about HULT PRIZE AASTU?{' '}
              <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what problem you want to solve, what drives you, or what you hope to learn..."
              className={`${inputClass('interest')} resize-none`}
              value={data.interest}
              onChange={(e) => handleChange('interest', e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand-pink text-white font-bold rounded-xl shadow-lg shadow-brand-pink/25 hover:bg-brand-pink-hover hover:shadow-xl hover:shadow-brand-pink/35 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-base uppercase tracking-wider"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Registration...</span>
          </>
        ) : (
          <span>Complete Registration</span>
        )}
      </button>

      <p className="text-xs text-center text-brand-midnight/50 font-medium">
        By registering, you agree to be contacted by the HULT PRIZE AASTU organizing team.
      </p>
    </form>
  )
}
