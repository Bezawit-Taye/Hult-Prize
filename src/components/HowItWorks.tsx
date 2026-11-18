import { UserPlus, Users2, Sparkles, Award } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Register',
    description: 'Sign up for HULT PRIZE AASTU to gain access to exclusive campus workshops, resources, and challenge toolkits.',
    color: 'bg-brand-midnight text-white',
    accentBorder: 'border-brand-midnight/20',
  },
  {
    number: '02',
    icon: Users2,
    title: 'Connect',
    description: 'Meet fellow AASTU students across software, electrical, mechanical, and civil disciplines to form your startup team.',
    color: 'bg-brand-purple text-white',
    accentBorder: 'border-brand-purple/20',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Innovate',
    description: 'Design and validate an impactful, revenue-generating social enterprise guided by seasoned faculty and startup mentors.',
    color: 'bg-brand-pink text-white',
    accentBorder: 'border-brand-pink/20',
  },
  {
    number: '04',
    icon: Award,
    title: 'Compete',
    description: 'Pitch your venture at the HULT PRIZE AASTU Finals for the prestigious chance to represent AASTU in the Global Qualifiers.',
    color: 'bg-brand-blue text-white',
    accentBorder: 'border-brand-blue/20',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple-light border border-brand-purple/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-purple">
              The Competition Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight tracking-tight uppercase">
            How It <span className="text-brand-pink">Works</span>
          </h2>
          <p className="text-brand-midnight/65 mt-4 max-w-xl mx-auto text-base sm:text-lg">
            Your journey through HULT PRIZE AASTU from campus registration to international qualifiers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200/80 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black tracking-widest text-brand-midnight/40 font-mono">
                      STEP {step.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${step.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-brand-midnight mb-2.5">{step.title}</h3>
                  <p className="text-sm text-brand-midnight/70 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${step.color}`}
                      style={{
                        width:
                          step.number === '01'
                            ? '25%'
                            : step.number === '02'
                            ? '50%'
                            : step.number === '03'
                            ? '75%'
                            : '100%',
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
