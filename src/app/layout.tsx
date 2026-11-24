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
  icons: {
    icon: [
      { url: '/Hult-prize-aastu.jpg' },
    ],
    apple: [
      { url: '/Hult-prize-aastu.jpg' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC inline script for instant theme application */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white dark:bg-[#0A0815] text-brand-ink dark:text-slate-100 selection:bg-brand-pink/20 selection:text-brand-pink min-h-screen">
        {children}
      </body>
    </html>
  )
}
