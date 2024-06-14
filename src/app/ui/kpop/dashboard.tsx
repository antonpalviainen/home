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

  const videos = []

  for (const channel of channels) {
    const video = await fetchNextVideo(channel)
    if (video) {
      videos.push(video)
    }
  }

  if (!videos.length) {
    return (
      <p className="px-2 py-1 bg-white rounded-lg text-center">
        No videos found
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </ul>
  )
}
