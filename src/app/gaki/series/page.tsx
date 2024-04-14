import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { fetchSeries } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'
import { resolveLanguage } from '@/lib/gaki/utils'
import { SeriesListSkeleton } from '@/ui/gaki/skeletons'

export const metadata: Metadata = { title: 'Series' }

async function SeriesList({ language }: { language: Language }) {
  const series = await fetchSeries(language)

  return series.length ? (
    <ul className="w-full border rounded-lg divide-y dark:border-neutral-700 dark:divide-neutral-700">
      {series.map((series) => (
        <li key={series.id} className="px-2 py-1">
          <Link
            href={{
              pathname: `/gaki/series/${series.id}`,
              query: { lang: language },
            }}
            className="flex justify-between space-x-2"
          >
            <span>{series.name}</span>
            <span>{series.episodes}</span>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>No series found</p>
  )
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)

  return (
    <div className="w-full max-w-7xl flex justify-center">
      <Suspense key={language} fallback={<SeriesListSkeleton />}>
        <SeriesList language={language} />
      </Suspense>
    </div>
  )
}
