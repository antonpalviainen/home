import Link from 'next/link'

import { fetchNextVideo } from '@/lib/kpop/data'
import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

function Video({ video }: { video: Video | null }) {
  if (!video) {
    return null
  }

  return (
    <li className="mb-2">
      <h2 className="p-2 text-lg">
        <Link href={`/kpop/${video.channel.name}`}>{video.channel.name}</Link>
      </h2>
      <div className="p-2 border border-neutral-200 rounded-lg">
        <h3>{video.title}</h3>
        <p className="text-neutral-500 text-sm">
          {formatDate(video.date)} -{' '}
          <Link href={`/kpop/${video.channel.name}`}>
            {video.channel.title}
          </Link>{' '}
          - {formatDuration(video.duration)}
        </p>
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
    <main className="p-2">
      <ul>
        {videos.map((video, i) => (
          <Video key={video?.id ?? i} video={video} />
        ))}
      </ul>
    </main>
  )
}
