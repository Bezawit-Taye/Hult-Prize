import { Lightbulb, Network, Users, BookOpen, Globe, Award, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  {
    icon: Lightbulb,
    title: 'Entrepreneurship & Innovation',
    description: 'Learn venture-building methodologies and convert technical AASTU projects into real-world business enterprises.',
    iconStyle: 'bg-brand-pink/10 text-brand-pink group-hover:bg-brand-pink group-hover:text-white',
  },
  {
    icon: Network,
    title: 'Global & Local Networking',
    description: 'Connect with innovative peers across AASTU colleges, Ethiopian startup ecosystem founders, and alumni leaders.',
    iconStyle: 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white',
  },
  {
    icon: Users,
    title: 'Teamwork & Leadership',
    description: 'Build leadership and public speaking skills by pitching your business to a panel of esteemed industry judges.',
    iconStyle: 'bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple group-hover:text-white',
  },
  {
    icon: BookOpen,
    title: 'Mentorship & Masterclasses',
    description: 'Access tailored bootcamps on business model canvas, market research, and financial modeling organized at AASTU.',
    iconStyle: 'bg-brand-yellow/15 text-[#C49B00] group-hover:bg-brand-yellow group-hover:text-brand-ink',
  },
  {
    icon: Globe,
    title: 'Real-World Problem Solving',
    description: 'Solve acute social, environmental, and technological challenges aligned directly with the UN Sustainable Development Goals.',
    iconStyle: 'bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white',
  },
  {
    icon: Award,
    title: '$1M Seed Funding Path',
    description: 'Win the AASTU campus stage and unlock the opportunity to compete for $1,000,000 USD in equity-free global funding.',
    iconStyle: 'bg-brand-midnight/10 text-brand-midnight group-hover:bg-brand-midnight group-hover:text-white',
  },
]

export default function WhyParticipate() {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-pink-light border border-brand-pink/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-pink">
              Why Join HULT PRIZE AASTU
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-midnight tracking-tight uppercase">
            Why <span className="text-brand-pink">Participate?</span>
          </h2>
          <p className="text-brand-midnight/65 mt-4 max-w-xl mx-auto text-base sm:text-lg">
            HULT PRIZE AASTU is an intensive leadership accelerator and venture launchpad for ambitious students.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map(({ icon: Icon, title, description, iconStyle }) => (
            <div
              key={title}
              className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-brand-pink/30 hover:bg-white hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 ${iconStyle}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-midnight mb-2">{title}</h3>
                <p className="text-sm text-brand-midnight/70 leading-relaxed font-normal">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl bg-brand-midnight text-white p-8 sm:p-12 relative overflow-hidden shadow-xl shadow-brand-midnight/15">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-brand-pink mb-3 uppercase tracking-wider">
                HULT PRIZE AASTU 2026
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 uppercase">
                Ready to Turn Your Ideas Into Impact?
              </h3>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl">
                Registrations are free and open to all enrolled students at Addis Ababa Science and Technology University.
              </p>
            </div>
            <Link
              href="/register"
              className="flex-shrink-0 inline-flex items-center gap-2.5 px-8 py-4 bg-brand-pink text-white font-black rounded-xl shadow-lg shadow-brand-pink/30 hover:bg-brand-pink-hover hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base uppercase tracking-wider"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
