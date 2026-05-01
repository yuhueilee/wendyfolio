import type { Metadata } from 'next'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Wendyfolio',
  description: "A portfolio to showcase Wendy's side projects and experiences",
  icons: { icon: '/favicon.ico', apple: '/logo192.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
