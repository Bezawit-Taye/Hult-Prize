import { Globe, Target, Lightbulb, Users } from 'lucide-react'

export default function About() {
  const highlights = [
    {
      icon: Globe,
      label: 'Global Reach',
      desc: '150+ countries and thousands of universities participating annually.',
      accent: 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
    },
    {
      icon: Target,
      label: 'SDG Aligned',
      desc: 'Every venture directly addresses the UN Sustainable Development Goals.',
      accent: 'bg-brand-pink/10 text-brand-pink group-hover:bg-brand-pink group-hover:text-white',
    },
    {
      icon: Lightbulb,
      label: 'Innovation First',
      desc: 'Transforming classroom concepts into viable, scalable social ventures.',
      accent: 'bg-brand-yellow/15 text-[#C49B00] group-hover:bg-brand-yellow group-hover:text-brand-ink',
    },
    {
      icon: Users,
      label: 'Student Led',
      desc: 'Organized on campus by students, mentors, and academic leaders.',
      accent: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
    },
  ]

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Story */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                About the Movement
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight tracking-tight mb-6">
              What is <span className="text-brand-pink">EF Hult Prize?</span>
            </h2>

            <div className="space-y-4 text-brand-midnight/75 text-base sm:text-lg leading-relaxed">
              <p>
                Often referred to as the <em className="text-brand-midnight font-semibold">&quot;Nobel Prize for Students,&quot;</em> the{' '}
                <strong className="text-brand-midnight font-bold">EF Hult Prize</strong> is the world&apos;s
                largest student competition and movement for social entrepreneurship.
              </p>
              <p>
                Each year, the competition presents university students with a global challenge
                aligned with the United Nations Sustainable Development Goals (SDGs). Students form
                teams to formulate innovative, scalable, and for-profit business ideas addressing the
                most critical global issues.
              </p>
              <p>
                The competition culminates in the Global Finals, where the winning team receives{' '}
                <strong className="text-brand-midnight font-bold">$1,000,000 USD</strong> in equity-free
                seed capital to bring their social enterprise to reality.
              </p>
            </div>

            {/* Quote Block */}
            <div className="mt-8 p-6 bg-brand-purple-light/50 border-l-4 border-brand-purple rounded-r-2xl">
              <p className="text-brand-midnight/90 text-sm sm:text-base font-medium italic">
                &quot;The EF Hult Prize believes in the boundless power of young minds to change the
                world. Every great enterprise begins with an idea — yours could be next.&quot;
              </p>
            </div>
          </div>

          {/* Right: Value Grid + SDG Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc, accent }) => (
              <div
                key={label}
                className="p-6 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-brand-pink/30 hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 ${accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-midnight mb-1.5">{label}</h3>
                <p className="text-xs sm:text-sm text-brand-midnight/60 leading-relaxed">{desc}</p>
              </div>
            ))}

            {/* United Nations SDGs Banner */}
            <div className="sm:col-span-2 p-6 bg-brand-midnight text-white rounded-2xl relative overflow-hidden shadow-lg shadow-brand-midnight/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/15">
                  <Target className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">
                    United Nations SDGs Alignment
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                    Every project is evaluated on its measurable contribution toward the 17 UN Sustainable Development Goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
