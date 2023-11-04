import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Todo | FB',
  description: 'Todo App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className='px-2'>
        {children}
      </body>
    </html>
  )
}
