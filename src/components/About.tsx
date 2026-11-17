import { Globe, Target, Lightbulb, Users } from 'lucide-react'

export default function About() {
  const highlights = [
    { icon: Globe, label: 'Global Reach', desc: '150+ countries participating annually' },
    { icon: Target, label: 'SDG Aligned', desc: 'Solutions tied to UN Sustainable Development Goals' },
    { icon: Lightbulb, label: 'Innovation First', desc: 'Ideas that create real social impact' },
    { icon: Users, label: 'Community Driven', desc: 'Built by students, for students' },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About the Program</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">
              What is <span className="text-primary">Hult Prize?</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Hult Prize is the world&apos;s largest student competition for social entrepreneurship.
                Founded in partnership with former U.S. President Bill Clinton and the Clinton Global
                Initiative, it challenges university students to solve the world&apos;s most pressing issues
                through innovative and sustainable business ventures.
              </p>
              <p>
                Each year, Hult Prize announces a new global challenge aligned with the United Nations
                Sustainable Development Goals (SDGs). Student teams develop and pitch sustainable
                social businesses addressing critical issues such as food security, education, and
                energy access.
              </p>
              <p>
                The winning team receives{' '}
                <strong className="text-gray-900">$1 million USD</strong> in seed funding to launch
                their social venture and create meaningful change worldwide.
              </p>
            </div>
            <div className="mt-8 p-5 bg-gray-50 rounded-xl border-l-4 border-primary">
              <p className="text-gray-700 font-medium italic">
                &quot;Hult Prize believes in the power of young people to change the world. Every great
                company started as an idea — yours could be next.&quot;
              </p>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-red-50 border border-transparent hover:border-primary/20 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{label}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
            <div className="col-span-2 p-5 bg-primary rounded-2xl text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">United Nations SDGs</div>
                  <div className="text-sm text-red-100">
                    Our challenges address the 17 Sustainable Development Goals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
