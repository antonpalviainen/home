'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import EditModal from './edit-modal'
import Tag from './tag'

export default function Video({ video }: { video: Video }) {
  const [open, setOpen] = useState(false)

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
            <button
              onClick={() => setOpen(true)}
              className="px-1 py-px bg-neutral-100 rounded-lg text-sm text-neutral-600 hover:bg-neutral-200"
            >
              edit
            </button>
          </div>
        </div>
      </div>
      <EditModal video={video} open={open} setOpen={setOpen} />
    </li>
  )
}
