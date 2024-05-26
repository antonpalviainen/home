import { fetchVideos, fetchVideosPages } from '@/lib/kpop/data'
import VideosDisplay from '@/ui/kpop/videos-display'

export async function generateMetadata({
  params,
}: {
  params: { channel: string }
}) {
  return {
    title: params.channel,
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { channel: string }
  searchParams: { page?: string; order?: string }
}) {
  const page = Math.max(Number(searchParams?.page ?? 1), 1)
  const order = searchParams?.order === 'asc' ? 'asc' : 'desc'
  const channel = params.channel

  const videos = await fetchVideos({ page, order, channel })
  const totalPages = await fetchVideosPages({ channel })

  return <VideosDisplay videos={videos} totalPages={totalPages} />
}
