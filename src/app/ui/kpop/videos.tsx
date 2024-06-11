import { fetchVideos } from '@/lib/kpop/data'
import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

function Video({ video }: { video: Video }) {
  return (
    <li className="mb-2">
      <div className="p-2 border border-neutral-200 rounded-lg">
        <h3>{video.title}</h3>
        <p className="text-neutral-500 text-sm">
          {formatDate(video.date)} - {video.channel.title} -{' '}
          {formatDuration(video.duration)}
        </p>
      </div>
    </li>
  )
}

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

  return (
    <main className="p-2">
      <ul>
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </ul>
    </main>
  )
}
