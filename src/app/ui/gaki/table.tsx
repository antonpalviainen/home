'use client'

import Link from 'next/link'
import { useState } from 'react'

import { fetchSeriesEpisodes } from '@/lib/gaki/data'

type Episodes = Awaited<ReturnType<typeof fetchSeriesEpisodes>>
type Series = Episodes[0]['series'][0]

function SeriesLabel({ series }: { series: Series }) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <Link
        href={`/gaki/series/${series.id}`}
        className="relative text-xs p-0.5 border border-white/15 rounded break-keep hover:bg-white/5"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        {series.abbreviation}
        {hovered ? (
          <span className="absolute text-base -top-9 end-0 z-10 p-0.5 text-center bg-black border border-white/15 rounded whitespace-nowrap">
            {series.name}
          </span>
        ) : null}
      </Link>
    </>
  )
}

export default function EpisodeTable({ episodes }: { episodes: Episodes }) {
  const hasEpisodes = Array.isArray(episodes) && episodes.length > 0

  return hasEpisodes ? (
    <ul>
      {episodes.map((ep) => (
        <li key={ep.id} className="flex px-2 py-1.5 hover:bg-white/10">
          <span className="min-w-10">{ep.number ?? '-'}</span>
          <span className="flex flex-1 justify-between items-center px-2">
            <span>{ep.title || '-'}</span>
            <div className="inline ml-2 space-x-2">
              {ep.series.map((series) => (
                <SeriesLabel key={series.id} series={series} />
              ))}
            </div>
          </span>
          <span className="whitespace-nowrap">
            {ep.date.toISOString().slice(0, 10)}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No episodes found</p>
  )
}
