import { Suspense } from 'react'

import Table from '@/ui/anime/table'

export default function Page({
  searchParams,
}: {
  searchParams?: { order?: string; direction?: string }
}) {
  const order = searchParams?.order || 'status'
  const direction = searchParams?.direction || 'asc'

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table order={order} direction={direction} />
    </Suspense>
  )
}
