import './globals.css'

import { Nunito } from 'next/font/google'
// reserver constant where u can conrol ur title and otehr option
export const metadata = {
  title: 'Air CNC',
  description: 'Air BnB clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
