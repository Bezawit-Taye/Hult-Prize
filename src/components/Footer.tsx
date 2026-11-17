import { Trophy, Mail, Instagram, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Hult Prize <span className="text-primary">OnCampus</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Empowering students to solve the world&apos;s most pressing challenges through
              entrepreneurship and innovation.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              📍 [Your University Name] — Campus Chapter
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'Register', href: '/register' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Mail className="w-4 h-4 text-primary" />
              <span>[contact@youruniversity.edu]</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 Hult Prize OnCampus — [Your University Name]. All rights reserved.</p>
          <p>Hult Prize is an independent student initiative.</p>
        </div>
      </div>
    </footer>
  )
}
