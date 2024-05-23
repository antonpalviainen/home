'use client'

import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

import { updateTags } from '@/lib/kpop/actions'
import { fetchAllVideos } from '@/lib/kpop/data'
import { formatDate } from '@/lib/utils'

type Videos = Awaited<ReturnType<typeof fetchAllVideos>>

function EditTags({ videoId, tags }: { videoId: string; tags: string[] }) {
  const [value, setValue] = useState(tags.join(' '))
  const updateTagsWithId = updateTags.bind(null, videoId)

  return (
    <div className="px-4 py-2">
      <form action={updateTagsWithId} className="flex space-x-2">
        <label htmlFor="tags">Edit tags:</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-1.5 border rounded-md text-gray-600 hover:bg-gray-50"
        >
          Save
        </button>
      </form>
    </div>
  )
}

function Tag({ name }: { name: string }) {
  let colors: string

  switch (name) {
    case 'watched':
      colors = 'border-green-200 bg-green-50 text-green-600'
      break
    case 'cover':
      colors = 'border-blue-200 bg-blue-50 text-blue-600'
      break
    case 'dance':
      colors = 'border-indigo-200 bg-indigo-50 text-indigo-600'
      break
    case 'live':
      colors = 'border-yellow-200 bg-yellow-50 text-yellow-600'
      break
    case 'mv':
      colors = 'border-pink-200 bg-pink-50 text-pink-600'
      break
    default:
      colors = 'border-gray-200 bg-gray-50 text-gray-600'
  }

  return <span className={`px-1.5 rounded-md border ${colors}`}>{name}</span>
}

export default function Table({ videos }: { videos: Videos }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="w-full divide-y divide-gray-200">
        {videos.map((video, i) => {
          const isOpen = openIndex === i
          return (
            <div key={video.id} className="group">
              <div className="flex justify-between items-center">
                <div className="w-28 px-4 py-2 whitespace-nowrap">
                  {formatDate(new Date(video.date))}
                </div>
                <div className="w-40 px-4 py-2 whitespace-nowrap">
                  <Link href={`/kpop/${video.channel.name}`}>
                    {video.channel.name}
                  </Link>
                </div>
                <div className=" grow px-4 py-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                  >
                    {video.title}
                  </a>
                </div>
                <div className="min-w-14 flex items-center px-4 py-2 space-x-1 text-sm whitespace-nowrap">
                  {video.tags.map(({ name }) => (
                    <Tag key={name} name={name} />
                  ))}
                  <button
                    title={isOpen ? 'Cancel' : 'Edit tags'}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`justify-center items-center p-1 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 ${
                      isOpen ? 'flex' : 'hidden group-hover:flex'
                    }`}
                  >
                    {isOpen ? (
                      <XMarkIcon className="w-3 h-3" />
                    ) : (
                      <PencilIcon className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
              {isOpen ? (
                <EditTags
                  videoId={video.id}
                  tags={video.tags.map(({ name }) => name)}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </>
  )
}
