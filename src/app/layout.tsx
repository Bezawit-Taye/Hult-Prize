import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EF Hult Prize — OnCampus | [Your University Name]',
  description:
    'Register for EF Hult Prize — OnCampus. Join the global movement empowering young people to solve real-world challenges through entrepreneurship.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="font-sans antialiased bg-white text-brand-ink selection:bg-brand-pink/20 selection:text-brand-pink">
        {children}
      </body>
    </html>
  )
}
