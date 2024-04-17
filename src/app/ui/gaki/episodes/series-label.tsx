'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { Language, Series } from '@/lib/gaki/definitions'

export function SeriesLabel({
  series,
  language,
}: {
  series: Series
  language: Language
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <Link
        href={{
          pathname: `/gaki/series/${series.id}`,
          query: { lang: language },
        }}
        className="relative text-xs p-0.5 border rounded break-keep whitespace-nowrap dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        {series.abbreviation}
        {hovered ? (
          <span className="absolute text-base -top-9 end-0 z-10 px-1 py-0.5 text-center bg-white text-black border rounded whitespace-nowrap dark:border-white/10 dark:bg-[#172d69] dark:text-white">
            {series.name}
          </span>
        ) : null}
      </Link>
    </>
  )
}
