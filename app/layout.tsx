import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strava Data Viewer',
  description: 'View and download your Strava data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}

