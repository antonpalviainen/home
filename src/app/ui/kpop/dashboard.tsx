import { fetchNextVideo } from '@/lib/kpop/data'

import Video from './video'

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

  const results = await Promise.all(
    channels.map(async (channel) => {
      return await fetchNextVideo(channel)
    })
  )

  if (!results.length) {
    return <p>No videos found</p>
  }

  const videos = []

  for (const result of results) {
    if (result) {
      videos.push(result)
    }
  }

  return (
    <ul className="space-y-2">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </ul>
  )
}
