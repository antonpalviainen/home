'use client'

import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Fragment, useState } from 'react'

import type { Videos } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

import { Tag } from './tag'
import { TagUpdateFormRow } from './tag-update-form-row'

export default function TableBody({ videos }: { videos: Videos }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <tbody>
      {videos.map((video, i) => {
        const isOpen = openIndex === i
        return (
          <Fragment key={video.id}>
            <tr className="group border-t">
              <td className="px-4 py-2 whitespace-nowrap">
                {formatDate(new Date(video.date))}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Link href={`/kpop/${video.channel.name}`}>
                  {video.channel.title}
                </Link>
              </td>
              <td className="px-4 py-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                >
                  {video.title}
                </a>
              </td>
              <td className="px-4 py-2 text-right">
                {formatDuration(video.duration)}
              </td>
              <td className="p-2 pl-4 space-x-1 text-sm whitespace-nowrap">
                {video.tags.map(({ name }) => (
                  <Tag key={name} name={name} />
                ))}
              </td>
              <td>
                <button
                  title={isOpen ? 'Cancel' : 'Edit tags'}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`flex justify-center items-center p-1 border rounded-md text-gray-400 hover:bg-gray-50 ${
                    isOpen ? 'visible' : 'invisible group-hover:visible'
                  }`}
                >
                  {isOpen ? (
                    <XMarkIcon className="w-3 h-3" />
                  ) : (
                    <PencilIcon className="w-3 h-3" />
                  )}
                </button>
              </td>
            </tr>
            {isOpen ? (
              <TagUpdateFormRow
                videoId={video.id}
                tags={video.tags.map(({ name }) => name)}
                onTagsUpdate={() => setOpenIndex(null)}
              />
            ) : null}
          </Fragment>
        )
      })}
    </tbody>
  )
}
