import type { Metadata } from 'next'

import { fetchAllVideos, fetchVideosPages } from '@/lib/kpop/data'
import Pagination from '@/ui/kpop/pagination'
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

  const totalPages = await fetchVideosPages({})

  return (
    <div>
      <Table videos={videos} />
      <div className="flex mt-4 justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
