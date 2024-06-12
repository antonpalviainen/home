import { fetchVideos } from '@/lib/kpop/data'
import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

function Tag({ name }: { name: string }) {
  return (
    <span className="px-1 bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-500">
      {name}
    </span>
  )
}

function Video({ video }: { video: Video }) {
  return (
    <li>
      <div className="p-2 space-y-1">
        <h3>{video.title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-neutral-500 text-sm">
            {formatDate(video.date)} - {video.channel.title} -{' '}
            {formatDuration(video.duration)}
          </span>
          <div>
            {video.tags?.map(({ name }) => (
              <Tag key={name} name={name} />
            ))}
          </div>
        </div>
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
    <main>
      <ul className="divide-y divide-neutral-200">
        {videos.map((video) => (
          <Video key={video.id} video={video} />
        ))}
      </ul>
    </main>
  )
}
