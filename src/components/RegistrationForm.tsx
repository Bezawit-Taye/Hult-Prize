'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react'

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
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!data.phone.trim()) {
      e.phone = 'Phone number is required.'
    } else if (!/^[+\d\s\-().]{7,20}$/.test(data.phone)) {
      e.phone = 'Please enter a valid phone number.'
    }
    if (!data.department.trim()) e.department = 'Department is required.'
    if (!data.academic_year) e.academic_year = 'Academic year is required.'
    if (!data.team_status) e.team_status = 'Please select a participation option.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (
    key: keyof FormData,
    value: string
  ) => {
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!validate()) return

    setLoading(true)
    try {
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
            'A registration with this Student ID or email already exists. Please check your details.'
          )
        } else {
          setSubmitError(
            'Something went wrong. Please try again or contact the organizing team.'
          )
        }
        return
      }

      const ref = result.id.split('-')[0].toUpperCase()
      setSuccess(ref)
    } catch {
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (key: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    } text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm`

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Thank you for your interest in Hult Prize OnCampus. Your registration has been received
          successfully. Our organizing team will contact you with further information.
        </p>
        <div className="inline-block bg-gray-50 rounded-xl px-6 py-3 mb-6">
          <p className="text-xs text-gray-500 mb-1">Your Registration Reference</p>
          <p className="text-xl font-black text-primary tracking-widest">{success}</p>
        </div>
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6"
    >
      {submitError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          Personal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Jane Smith"
              className={inputClass('full_name')}
              value={data.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
            />
            {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Student ID <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 20231234"
                className={inputClass('student_id')}
                value={data.student_id}
                onChange={(e) => handleChange('student_id', e.target.value)}
              />
              {errors.student_id && (
                <p className="mt-1 text-xs text-red-500">{errors.student_id}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                University Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. jane@university.edu"
                className={inputClass('email')}
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. +1 555 000 0000"
                className={inputClass('phone')}
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Department <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                className={inputClass('department')}
                value={data.department}
                onChange={(e) => handleChange('department', e.target.value)}
              />
              {errors.department && (
                <p className="mt-1 text-xs text-red-500">{errors.department}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Academic Year <span className="text-primary">*</span>
            </label>
            <select
              className={inputClass('academic_year')}
              value={data.academic_year}
              onChange={(e) => handleChange('academic_year', e.target.value)}
            >
              <option value="">Select your academic year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="5th Year">5th Year</option>
              <option value="Graduate">Graduate</option>
            </select>
            {errors.academic_year && (
              <p className="mt-1 text-xs text-red-500">{errors.academic_year}</p>
            )}
          </div>
        </div>
      </div>

      {/* Participation Information */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          Participation Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Do you currently have a team? <span className="text-primary">*</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'has_team', label: 'Yes, I already have a team.' },
                { value: 'looking_for_team', label: 'No, I am looking for teammates.' },
                { value: 'want_to_learn', label: 'I want to learn more before joining.' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    data.team_status === opt.value
                      ? 'border-primary bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="team_status"
                    value={opt.value}
                    checked={data.team_status === opt.value}
                    onChange={(e) => {
                      handleChange('team_status', e.target.value)
                    }}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.team_status && (
              <p className="mt-1 text-xs text-red-500">{errors.team_status}</p>
            )}
          </div>

          {data.team_status === 'has_team' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Team Name{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Team Innovate"
                className={inputClass('team_name')}
                value={data.team_name}
                onChange={(e) => handleChange('team_name', e.target.value)}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What interests you most about Hult Prize?{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Share what excites you about this opportunity..."
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
        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Complete Registration'
        )}
      </button>

      <p className="text-xs text-center text-gray-400">
        By registering, you agree to be contacted by the Hult Prize OnCampus organizing team.
      </p>
    </form>
  )
}
