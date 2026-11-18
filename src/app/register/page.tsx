import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'

export const metadata = {
  title: 'Register | HULT PRIZE AASTU',
  description: 'Submit your student registration for the official HULT PRIZE AASTU competition at Addis Ababa Science and Technology University.',
}

export default function RegisterPage() {
  return (
    <main className="bg-white dark:bg-[#0A0815] min-h-screen flex flex-col justify-between transition-colors duration-150">
      <Navbar />
      <div className="flex-1 bg-slate-50/70 dark:bg-[#0D0B1C] py-16 px-4 pt-32 sm:pt-36 transition-colors duration-150">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink-light dark:bg-brand-pink/15 border border-brand-pink/20 dark:border-brand-pink/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-pink">
                AASTU Campus Registration
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-brand-midnight dark:text-white tracking-tight mb-3 uppercase">
              HULT PRIZE <span className="text-brand-pink">AASTU</span>
            </h1>
            <p className="text-brand-midnight/70 dark:text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
              Complete the registration form below to secure your spot in HULT PRIZE AASTU. Fields marked with{' '}
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
