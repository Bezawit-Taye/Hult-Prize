import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hult Prize OnCampus | [Your University Name]',
  description:
    'Register for Hult Prize OnCampus — join the global movement empowering young entrepreneurs to solve real-world challenges.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
