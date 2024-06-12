import { Suspense } from 'react'

import Dashboard from '@/ui/kpop/dashboard'
import Header from '@/ui/kpop/header'
import { VideoSkeleton } from '@/ui/kpop/skeletons'

export default function Page() {
  return (
    <>
      <Header />
      <main className="p-2">
        <Suspense fallback={<VideoSkeleton />}>
          <Dashboard />
        </Suspense>
      </main>
    </>
  )
}
