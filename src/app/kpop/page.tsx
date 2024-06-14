import { Suspense } from 'react'

import Dashboard from '@/ui/kpop/dashboard'
import Header from '@/ui/kpop/header'
import { VideoSkeleton } from '@/ui/kpop/skeletons'

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex justify-center p-2">
        <div className="max-w-3xl w-full">
          <Suspense fallback={<VideoSkeleton />}>
            <Dashboard />
          </Suspense>
        </div>
      </main>
    </>
  )
}
