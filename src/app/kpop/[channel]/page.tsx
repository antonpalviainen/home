import { Suspense } from 'react'

import Header from '@/ui/kpop/header'
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
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Videos channel={params.channel} page={page} order={order} />
      </Suspense>
    </>
  )
}
