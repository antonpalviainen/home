import { fetchChannelVideos, fetchVideosPages } from '@/lib/kpop/data'
import Pagination from '@/ui/kpop/pagination'
import Table from '@/ui/kpop/table'

export async function generateMetadata({
  params,
}: {
  params: { channel: string }
}) {
  return {
    title: decodeURIComponent(params.channel),
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
  const channel = decodeURIComponent(params.channel)

  const videos = await fetchChannelVideos({
    name: channel,
    order,
    page,
  })
  const totalPages = await fetchVideosPages({ channel })

  if (!videos || videos.length === 0) {
    return <p>No videos found</p>
  }

  return (
    <div>
      <Table videos={videos} />
      <div className="flex mt-4 justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
