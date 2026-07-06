import type { Metadata, Viewport } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nakshatra Kaushik — Edge AI & GenAI Engineer',
  description:
    'Electronics & Communication Engineer turned AI builder. Building agentic systems, Edge AI, and deploying production AI on cloud platforms.',
  keywords: [
    'Nakshatra Kaushik', 'AI Engineer', 'Edge AI', 'GenAI', 'Agentic AI',
    'Electronics Engineer', 'Portfolio', 'Machine Learning', 'Claude', 'AWS'
  ],
  authors: [{ name: 'Nakshatra Kaushik' }],
  openGraph: {
    title: 'Nakshatra Kaushik — Edge AI & GenAI Engineer',
    description: 'AI Engineer bridging hardware intelligence with generative AI.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nakshatra Kaushik — Edge AI & GenAI Engineer',
    description: 'AI Engineer bridging hardware intelligence with generative AI.',
  },
  icons: {
    icon: [
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#03030f',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
