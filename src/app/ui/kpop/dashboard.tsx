import Link from 'next/link'

import { fetchNextVideo } from '@/lib/kpop/data'
import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import Tag from './tag'

function Video({ video }: { video: Video | null }) {
  if (!video) {
    return null
  }

  return (
    <li className="mb-2">
      <div className="p-2 space-y-1 bg-white rounded-lg shadow">
        <Link
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
        >
          {video.title}
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-neutral-500 text-sm">
            {formatDate(video.date)} -{' '}
            <Link href={`/kpop/${video.channel.name}`}>
              {video.channel.title}
            </Link>{' '}
            - {formatDuration(video.duration)}
          </span>
          <div className="space-x-1">
            {video.tags?.map(({ name }) => (
              <Tag key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}

export default async function Dashboard() {
  const channels = [
    'aespa',
    'chuucandoit',
    'fromis9',
    'itzy',
    'ive',
    'izone',
    'lesserafim',
    'loona',
    'newjeans',
    'nmixx',
  ]

  const videos = await Promise.all(
    channels.map(async (channel) => {
      return await fetchNextVideo(channel)
    })
  )

  if (!videos) {
    return <p>No videos found</p>
  }

  return (
    <ul>
      {videos.map((video, i) => (
        <Video key={video?.id ?? i} video={video} />
      ))}
    </ul>
  )
}
