import Link from 'next/link'

import { Videos } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import { Tag } from './tag'

export default function List({ videos }: { videos: Videos }) {
  return (
    <ul className="border divide-y rounded-lg">
      {videos.map((video) => (
        <li key={video.id} className="px-4 py-2 space-y-1">
          <div>
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
            >
              {video.title}
            </a>
          </div>
          <div className="flex justify-between items-center gap-2 text-sm text-neutral-600">
            <div>
              <span>{formatDate(new Date(video.date))}</span>
              {' - '}
              <Link href={`/kpop/${video.channel.name}`}>
                {video.channel.title}
              </Link>
              {' - '}
              <span>{formatDuration(video.duration)}</span>
            </div>
            <div>
              {video.tags.map(({ name }) => (
                <Tag key={name} name={name} />
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}