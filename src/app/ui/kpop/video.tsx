'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import { EditModal } from './edit-modal'

function Tag({ name }: { name: string }) {
  return (
    <span className="px-1.5 py-0.5 bg-red-200 rounded-lg text-sm text-neutral-500">
      {name}
    </span>
  )
}

export default function Video({ video }: { video: Video }) {
  const [open, setOpen] = useState(false)

  return (
    <li>
      {open ? (
        <EditModal
          video={video}
          onClose={() => setOpen(false)}
        />
      ) : null}
      <div
        onClick={() => setOpen(true)}
        className="p-2 space-y-1 bg-white rounded-lg shadow"
      >
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
