import type { Metadata } from 'next'

import { fetchVideos, fetchVideosPages } from '@/lib/kpop/data'
import VideosDisplay from '@/ui/kpop/videos-display'

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

  const videos = await fetchVideos({ page, order })
  const totalPages = await fetchVideosPages({})

  return <VideosDisplay videos={videos} totalPages={totalPages} />
}
