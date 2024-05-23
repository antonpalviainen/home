import { fetchChannelVideos } from '@/lib/kpop/data'
import Table from '@/ui/kpop/table'

export default async function Page({
  params,
  searchParams,
}: {
  params: { channel: string }
  searchParams: { page?: string; order?: string }
}) {
  const page = Math.max(Number(searchParams?.page ?? 1), 1)
  const order = searchParams?.order === 'asc' ? 'asc' : 'desc'
  const videos = await fetchChannelVideos({
    name: decodeURIComponent(params.channel),
    order,
    page,
  })

  if (!videos || videos.length === 0) {
    return <p>No videos found</p>
  }

  return <Table videos={videos} />
}
