'use client'

import Link from 'next/link'

import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import EditModal from './edit-modal'
import Tag from './tag'

export default function Video({ video }: { video: Video }) {
  return (
    <li>
      <div className="p-2 bg-white rounded-lg shadow">
        <Link
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
        >
          {video.title}
        </Link>
        <div className="flex justify-between items-center mt-1 h-6">
          <span className="text-neutral-500 text-sm">
            {formatDate(video.date)} -{' '}
            <Link href={`/kpop/${video.channel.name}`}>
              {video.channel.title}
            </Link>{' '}
            - {formatDuration(video.duration)}
          </span>
          <div className="flex gap-1 items-center">
            {video.tags?.map(({ name }) => (
              <Tag key={name} name={name} />
            ))}
            <EditModal video={video} />
          </div>
        </div>
      </div>
    </li>
  )
}
