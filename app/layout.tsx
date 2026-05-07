import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Resul Ersürer | Enterprise Software Architect & Backend Specialist',
  description: 'Kurumsal düzeyde ölçeklenebilir backend sistemleri, Web API ve otomasyon çözümleri. ASP.NET Core & Enterprise Architecture uzmanlığı.',
  keywords: 'Backend Architect, ASP.NET Core, Enterprise Software, Web API, System Design, Automation',
  icons: {
    icon: '/images/logo2.png',
  },
  openGraph: {
    title: 'Resul Ersürer | Enterprise Software Architect',
    description: 'Kurumsal düzeyde ölçeklenebilir backend sistemleri ve mimari çözümler.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
