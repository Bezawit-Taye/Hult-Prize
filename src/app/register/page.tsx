import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RegistrationForm from '@/components/RegistrationForm'

export const metadata = {
  title: 'Register | Hult Prize OnCampus',
}

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-red-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Join the Movement
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Register for Hult Prize OnCampus
            </h1>
            <p className="text-gray-600">
              Complete the form below to secure your spot. Fields marked with{' '}
              <span className="text-primary font-semibold">*</span> are required.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
