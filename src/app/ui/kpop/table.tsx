'use client'

import { PencilIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Fragment, useState } from 'react'

import { fetchAllVideos } from '@/lib/kpop/data'
import { formatDate, formatDuration } from '@/lib/utils'

import { TagUpdateFormRow } from './tag-update-form-row'

type Videos = Awaited<ReturnType<typeof fetchAllVideos>>

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

  return <span className={`px-1 rounded-md border ${color}`}>{name}</span>
}

function VideoFilters() {
  return (
    <div className="flex justify-center p-4 pt-2 gap-8 lg:justify-end">
      <div>
        <input
          type="checkbox"
          name="hide-watched"
          id="hide-watched"
          className="accent-black"
        />
        <label htmlFor="hide-watched" className="ml-2">
          hide watched
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          name="hide-shorts"
          id="hide-shorts"
          className="accent-black"
        />
        <label htmlFor="hide-shorts" className="ml-2">
          hide shorts
        </label>
      </div>
    </div>
  )
}

export default function Table({ videos }: { videos: Videos }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      <VideoFilters />
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">date</th>
              <th className="px-4 py-2">channel</th>
              <th className="px-4 py-2">title</th>
              <th className="px-4 py-2">length</th>
              <th className="px-4 py-2">tags</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
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
        </table>
      </div>
    </div>
  )
}
