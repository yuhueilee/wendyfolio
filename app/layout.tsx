import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'YuHuei Lee — Software Engineer',
  description:
    'Portfolio of YuHuei Lee, a software engineer working across backend, mobile, and web.',
  icons: { icon: '/favicon.ico', apple: '/logo192.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
