import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Header from '../components/Header'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Golf Savants',
  description: 'Your golf insights platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-gray-50 pt-36 md:pt-24`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="text-center py-4 text-purple-800">
          © {new Date().getFullYear()} Golf Savants. All rights reserved.
        </footer>
      </body>
    </html>
  )
}