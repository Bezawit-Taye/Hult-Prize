'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        console.error('Supabase login error:', authError)
        setError(authError.message || 'Invalid email or password. Please try again.')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/70 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Brand Header with Official Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo
            variant="dark"
            size="lg"
            className="justify-center mb-3"
            subtitle="Addis Ababa Science & Technology University"
          />
          <h1 className="text-xl font-black text-brand-midnight tracking-tight uppercase mt-2">
            Organizer Portal
          </h1>
          <p className="text-xs text-brand-midnight/60 mt-1 font-medium">
            HULT PRIZE AASTU Organizing Committee
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8">
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-brand-red/20 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-brand-red">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coordinator@aastu.edu.et"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-brand-midnight placeholder:text-slate-400 focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-midnight/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 text-brand-midnight placeholder:text-slate-400 focus:outline-none focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-midnight"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-pink text-white font-bold rounded-xl hover:bg-brand-pink-hover shadow-md shadow-brand-pink/25 hover:shadow-lg hover:shadow-brand-pink/35 disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 mt-3 text-sm uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brand-midnight/50 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-brand-pink transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
