import type { Metadata } from 'next'
import { ReactNode, Suspense } from 'react'

import Header from '@/ui/gaki/header'
import { HeaderSkeleton } from '@/ui/gaki/skeletons'

export const metadata: Metadata = {
  title: {
    template: 'Gaki no Tsukai - %s',
    default: 'Gaki no Tsukai',
  },
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main className="flex justify-center p-4 md:p-10 md:pt-4">
        {children}
      </main>
    </>
  )
}
