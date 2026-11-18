import { Globe, Target, Lightbulb, Users } from 'lucide-react'

export default function About() {
  const highlights = [
    {
      icon: Globe,
      label: 'Global Stage',
      desc: '150+ countries and thousands of universities participating annually in the movement.',
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
      label: 'AASTU Innovation',
      desc: 'Transforming STEM concepts from AASTU laboratories into scalable social enterprises.',
      accent: 'bg-brand-yellow/15 text-[#C49B00] dark:text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-ink',
    },
    {
      icon: Users,
      label: 'Campus Community',
      desc: 'Driven by passionate student leaders, faculty advisors, and mentors at AASTU.',
      accent: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
    },
  ]

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0A0815] relative transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Story */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink-light dark:bg-brand-pink/15 border border-brand-pink/20 dark:border-brand-pink/30 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
              <span className="text-xs font-black uppercase tracking-wider text-brand-pink">
                About the Campus Movement
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight dark:text-white tracking-tight mb-6 uppercase">
              What is <span className="text-brand-pink">HULT PRIZE AASTU?</span>
            </h2>

            <div className="space-y-4 text-brand-midnight/75 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                Known as the <em className="text-brand-midnight dark:text-white font-semibold">&quot;Nobel Prize for Students,&quot;</em> the{' '}
                <strong className="text-brand-midnight dark:text-white font-bold">Hult Prize</strong> is the world&apos;s
                largest student engine for launching social impact startups.
              </p>
              <p>
                At <strong className="text-brand-midnight dark:text-white font-bold">Addis Ababa Science and Technology University (AASTU)</strong>,{' '}
                the <strong className="text-brand-pink font-bold">HULT PRIZE AASTU</strong> chapter challenges visionary students to formulate innovative,
                technology-driven, and commercially viable business solutions addressing pressing global problems aligned with the United Nations SDGs.
              </p>
              <p>
                The winning team from AASTU earns direct advancement to the international qualifier stages, competing for{' '}
                <strong className="text-brand-midnight dark:text-white font-bold">$1,000,000 USD</strong> in equity-free
                global seed capital to launch their social enterprise.
              </p>
            </div>

            {/* Quote Block */}
            <div className="mt-8 p-6 bg-brand-purple-light/50 dark:bg-brand-purple/15 border-l-4 border-brand-purple rounded-r-2xl">
              <p className="text-brand-midnight/90 dark:text-slate-200 text-sm sm:text-base font-medium italic">
                &quot;HULT PRIZE AASTU provides students with the platform, mentorship, and global network needed to transform bold ideas into scalable ventures that change lives.&quot;
              </p>
            </div>
          </div>

          {/* Right: Value Grid + SDG Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc, accent }) => (
              <div
                key={label}
                className="p-6 bg-slate-50/80 dark:bg-[#131024] rounded-2xl border border-slate-100 dark:border-white/10 hover:border-brand-pink/30 hover:bg-white dark:hover:bg-[#1C1836] hover:shadow-md transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-200 ${accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-midnight dark:text-white mb-1.5">{label}</h3>
                <p className="text-xs sm:text-sm text-brand-midnight/60 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}

            {/* United Nations SDGs Banner */}
            <div className="sm:col-span-2 p-6 bg-brand-midnight dark:bg-[#17132F] text-white rounded-2xl relative overflow-hidden shadow-lg shadow-brand-midnight/10 border border-transparent dark:border-white/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink/15 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/15">
                  <Target className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">
                    UN Sustainable Development Goals
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                    HULT PRIZE AASTU ventures are built to solve real challenges through the lens of the 17 UN SDGs.
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
