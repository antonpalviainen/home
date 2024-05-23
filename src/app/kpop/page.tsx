import type { Metadata } from 'next'

import { fetchAllVideos } from '@/lib/kpop/data'
import Table from '@/ui/kpop/table'

export const metadata: Metadata = {
  title: 'All Videos',
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; order?: string }
}) {
  const page = Math.max(Number(searchParams?.page ?? 1), 1)
  const order = searchParams?.order === 'asc' ? 'asc' : 'desc'
  const videos = await fetchAllVideos({ order, page })

  return <Table videos={videos} />
}
