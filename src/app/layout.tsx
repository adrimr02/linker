import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './_trpc/Provider'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Linker',
  description: 'Linker is a free URL shortener',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode,
  authModal: React.ReactNode,
}) {
  return (
    <html lang="en" className={cn('bg-white text-slate-900', inter)}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Provider>
          <Navbar />

          { authModal }

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            { children }
          </div>
        </Provider>
        <Toaster />
      </body>
    </html>
  )
}
