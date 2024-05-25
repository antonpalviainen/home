'use client'

import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { updateTags } from '@/lib/kpop/actions'
import { fetchAllVideos } from '@/lib/kpop/data'
import { formatDate } from '@/lib/utils'

type Videos = Awaited<ReturnType<typeof fetchAllVideos>>

function Submit() {
  const status = useFormStatus()

  return (
    <button
      type="submit"
      disabled={status.pending}
      className="px-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
    >
      Save
    </button>
  )
}

function EditTags({ videoId, tags }: { videoId: string; tags: string[] }) {
  const [value, setValue] = useState(tags.join(' '))
  const updateTagsWithId = updateTags.bind(null, videoId)

  return (
    <tr>
      <td colSpan={5} className="px-8 py-2 text-gray-500">
        <form action={updateTagsWithId} className="flex space-x-2">
          <label htmlFor="tags">Edit tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-1 border border-gray-300 rounded"
          />
          <Submit />
        </form>
      </td>
    </tr>
  )
}

function Tag({ name }: { name: string }) {
  const colors = {
    watched: 'border-green-200 bg-green-50 text-green-600',
    cover: 'border-blue-200 bg-blue-50 text-blue-600',
    dance: 'border-indigo-200 bg-indigo-50 text-indigo-600',
    live: 'border-yellow-200 bg-yellow-50 text-yellow-600',
    mv: 'border-pink-200 bg-pink-50 text-pink-600',
  }

  const color =
    colors[name as keyof typeof colors] ??
    'border-gray-200 bg-gray-50 text-gray-600'

  return <span className={`px-1.5 rounded-md border ${color}`}>{name}</span>
}

export default function Table({ videos }: { videos: Videos }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">date</th>
            <th className="px-4 py-2">channel</th>
            <th className="px-4 py-2">title</th>
            <th className="px-4 py-2">tags</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="w-full">
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
                      {video.channel.name}
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
                  <td className="flex justify-end items-center p-2 pl-4 space-x-1 text-sm whitespace-nowrap">
                    {video.tags.map(({ name }) => (
                      <Tag key={name} name={name} />
                    ))}
                  </td>
                  <td>
                    <button
                      title={isOpen ? 'Cancel' : 'Edit tags'}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className={`flex justify-center items-center p-1 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50 ${
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
                  <EditTags
                    videoId={video.id}
                    tags={video.tags.map(({ name }) => name)}
                  />
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
