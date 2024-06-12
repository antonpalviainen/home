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
      <main className="p-2">
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<VideoSkeleton />}
        >
          <Videos channel={params.channel} page={page} order={order} />
        </Suspense>
      </main>
    </>
  )
}
