import type { Metadata } from 'next'
import './globals.css'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'Wendy Lee — Software Engineer',
  description:
    'Portfolio of Wendy Lee (Lee Yu Huei), a software engineer working across backend services, responsive frontends, and the tests and tooling that keep both trustworthy.',
  icons: {
    icon: `${BASE_PATH}/logoNew.png`,
    apple: `${BASE_PATH}/logoNew.png`,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
