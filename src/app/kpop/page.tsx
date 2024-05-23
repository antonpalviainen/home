import Link from 'next/link'

import { fetchAllVideos } from '@/lib/kpop/data'
import { formatDate } from '@/lib/utils'

export default async function Page() {
  const videos = await fetchAllVideos({ order: 'desc', page: 1 })

  return (
    <ul className="divide-y divide-gray-200">
      {videos.map((video) => (
        <li key={video.id} className="p-2 space-y-1">
          <div>{video.title}</div>
          <div className="flex justify-between space-x-2 text-gray-600 text-sm">
            <span className="whitespace-nowrap">
              {formatDate(new Date(video.date))}
            </span>
            <span className="whitespace-nowrap">
              <Link
                href={`/kpop/${video.channel.name}`}
                className="hover:text-gray-400"
              >
                {video.channel.name}
              </Link>
            </span>
            {/* {video.tags.map(({ name }) => (
              <span key={name}>{name}</span>
            ))} */}
            <div className="flex-grow space-x-1 text-right">
              <span className="px-1 py-0.5 text-xs rounded-md bg-green-100 text-green-500">
                test
              </span>
              <span className="px-1 py-0.5 text-xs rounded-md bg-blue-100 text-blue-500">
                test
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
