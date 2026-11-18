'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from '@/components/Logo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why Participate', href: '/#why' },
    { label: 'FAQ', href: '/#faq' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_12px_rgba(41,37,99,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Logo */}
          <Logo variant="dark" size="md" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-brand-midnight/80 hover:text-brand-pink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-pink text-white text-sm font-bold shadow-md shadow-brand-pink/20 hover:bg-brand-pink-hover hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl text-brand-midnight hover:text-brand-pink hover:bg-brand-pink/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-5 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-brand-midnight hover:text-brand-pink py-2 px-3 rounded-lg hover:bg-brand-pink/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-pink text-white text-sm font-bold shadow-md shadow-brand-pink/20 hover:bg-brand-pink-hover transition-colors"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
