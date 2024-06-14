import { Suspense } from 'react'

import Header from '@/ui/kpop/header'
import { VideoSkeleton } from '@/ui/kpop/skeletons'
import Videos from '@/ui/kpop/videos'

export default function Page({
  params,
  searchParams,
}: {
  params: { channel: string }
  searchParams?: { page: string; order: 'asc' | 'desc' }
}) {
  const page = parseInt(searchParams?.page ?? '1')
  const order = searchParams?.order === 'asc' ? 'asc' : 'desc'

  return (
    <>
      <Header sortable={true} />
      <main className="flex justify-center p-2">
        <div className="max-w-3xl w-full">
          <Suspense
            key={JSON.stringify(searchParams)}
            fallback={<VideoSkeleton />}
          >
            <Videos channel={params.channel} page={page} order={order} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
