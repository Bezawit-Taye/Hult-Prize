import Link from 'next/link'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-midnight text-white pt-20">
      {/* Subtle brand ambient accents (Midnight base with Purple & Heritage Pink glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-midnight via-[#1F1B4E] to-brand-ink opacity-95" />

      {/* Decorative ambient radial gradients */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-purple/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-brand-pink/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        {/* Campus Brand Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
          <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white/95">
            HULT PRIZE <span className="text-brand-pink">AASTU</span>
          </span>
          <span className="hidden sm:inline-block text-white/40">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            2026 Edition
          </span>
        </div>

        {/* Hero Headline (Figtree Black) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.08] uppercase">
          Turn Your Ideas
          <br />
          <span className="bg-gradient-to-r from-brand-pink via-[#FF6BB3] to-brand-purple text-transparent bg-clip-text">
            Into Impact.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Join the <strong className="text-white font-bold">HULT PRIZE AASTU</strong> community and become part of a global movement empowering
          young people at Addis Ababa Science and Technology University to solve real-world challenges through entrepreneurship.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-pink text-white font-extrabold rounded-xl shadow-lg shadow-brand-pink/30 hover:bg-brand-pink-hover hover:shadow-xl hover:shadow-brand-pink/40 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider text-sm sm:text-base"
          >
            <span>Register Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/35 transition-all duration-200 text-sm sm:text-base"
          >
            <span>Discover the Program</span>
            <ChevronDown className="w-4 h-4 text-gray-300" />
          </a>
        </div>

        {/* Key Stats Bar */}
        <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto border-t border-white/10 pt-10">
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-black text-white">50,000+</div>
            <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Students Worldwide</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-2xl sm:text-4xl font-black text-brand-pink">150+</div>
            <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-black text-white">$1M+</div>
            <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Seed Funding</div>
          </div>
        </div>
      </div>
    </section>
  )
}
