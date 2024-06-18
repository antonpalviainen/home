import { fetchVideos, fetchVideosPages } from '@/lib/kpop/data'

import Pagination from './pagination'
import Video from './video'

export default async function Videos({
  channel,
  page,
  order,
}: {
  channel: string
  page: number
  order: 'asc' | 'desc'
}) {
  const parsedChannel = channel === 'all' ? undefined : channel

  const videos = await fetchVideos({ channel: parsedChannel, page, order })
  const totalPages = await fetchVideosPages({
    channel: parsedChannel,
  })

  return (
    <>
      <ul className="space-y-2">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </ul>
      <div className="flex justify-center my-4">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
