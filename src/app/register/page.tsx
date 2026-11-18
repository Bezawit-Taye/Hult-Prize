import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'

export const metadata = {
  title: 'Register | EF Hult Prize — OnCampus',
  description: 'Submit your student registration for the official EF Hult Prize — OnCampus competition.',
}

export default function RegisterPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 bg-slate-50/70 py-16 px-4 pt-32 sm:pt-36">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                Official Student Registration
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-midnight tracking-tight mb-3">
              EF Hult Prize <span className="text-brand-pink">— OnCampus</span>
            </h1>
            <p className="text-brand-midnight/70 text-sm sm:text-base max-w-lg mx-auto">
              Complete the registration form below to secure your spot. Fields marked with{' '}
              <span className="text-brand-pink font-semibold">*</span> are mandatory.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
