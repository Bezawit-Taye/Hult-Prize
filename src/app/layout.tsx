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
  title: 'HULT PRIZE AASTU | Addis Ababa Science and Technology University',
  description:
    'Official registration portal for HULT PRIZE AASTU. Join the world’s largest student movement empowering young entrepreneurs to solve real-world challenges.',
  keywords: [
    'HULT PRIZE AASTU',
    'Hult Prize',
    'AASTU',
    'Addis Ababa Science and Technology University',
    'Social Entrepreneurship',
    'Student Competition',
  ],
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
