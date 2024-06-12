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
  const videos = await fetchVideos({ channel, page, order })
  const totalPages = await fetchVideosPages({ channel })

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
