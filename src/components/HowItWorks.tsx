import { UserPlus, MessageSquare, Zap, Trophy } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Register',
    description: 'Sign up for Hult Prize OnCampus and join our growing community of student entrepreneurs.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Connect',
    description: 'Meet fellow students, find teammates, and start building meaningful connections.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Innovate',
    description: 'Develop creative solutions to real-world problems with the support of mentors and peers.',
  },
  {
    number: '04',
    icon: Trophy,
    title: 'Compete',
    description: 'Participate in campus stages and compete for the chance to advance in the global competition.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">The Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Your journey from student to entrepreneur in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <div className="text-xs font-black text-primary/30 mb-4 tracking-widest">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
