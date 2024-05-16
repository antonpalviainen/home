import type { Metadata } from 'next'
import { ReactNode, Suspense } from 'react'

import Header from '@/ui/gaki/header'
import { HeaderSkeleton } from '@/ui/gaki/skeletons'

import './style.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Gaki no Tsukai',
    default: 'Gaki no Tsukai',
  },
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full min-h-screen bg-fixed dark:bg-gradient-to-b dark:from-[#0e1734] dark:to-[#172d69] dark:text-white">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main className="flex justify-center p-4 md:p-10 md:pt-4">
        {children}
      </main>
    </div>
  )
}
