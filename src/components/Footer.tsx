import { Mail, Instagram, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="bg-brand-midnight text-gray-300 border-t border-brand-midnight-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" campusName="[Your University Name]" />
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm pt-2">
              Empowering university students to solve the world&apos;s most pressing challenges through
              social entrepreneurship, innovation, and sustainable business ventures.
            </p>
            <div className="pt-1">
              <span className="inline-block text-xs font-medium text-brand-pink bg-brand-pink/10 border border-brand-pink/20 px-3 py-1 rounded-full">
                📍 [Your University Name] — OnCampus Chapter
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About the Program', href: '/#about' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Why Participate', href: '/#why' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Register Now', href: '/register' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-pink transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Contact & Connect
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2.5 text-gray-400">
                <Mail className="w-4 h-4 text-brand-pink flex-shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer truncate">
                  [contact@youruniversity.edu]
                </span>
              </div>
              <div className="pt-2">
                <span className="text-xs text-gray-400 block mb-2 font-medium">Follow our chapter:</span>
                <div className="flex items-center gap-2.5">
                  {[
                    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/hultprize' },
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/hult-prize-foundation' },
                    { icon: Github, label: 'GitHub', href: 'https://github.com/Bezawit-Taye/Hult-Prize' },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-pink hover:border-brand-pink transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 EF Hult Prize — OnCampus. [Your University Name]. All rights reserved.</p>
          <p className="text-gray-400">
            Official Competition Platform • EF Hult Prize Foundation
          </p>
        </div>
      </div>
    </footer>
  )
}
