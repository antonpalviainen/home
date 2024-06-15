'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import { EditModal } from './edit-modal'
import Tag from './tag'

export default function Video({ video }: { video: Video }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <li>
      {open ? <EditModal video={video} onClose={() => setOpen(false)} /> : null}
      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        tabIndex={0}
        className="p-2 space-y-1 bg-white rounded-lg shadow"
      >
        <Link
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
        >
          {video.title}
        </Link>
        <div className="flex justify-between items-center h-6">
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
