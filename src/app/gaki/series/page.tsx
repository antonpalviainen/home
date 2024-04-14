import type { Metadata } from 'next'
import Link from 'next/link'

import { fetchSeries } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'

export const metadata: Metadata = { title: 'Series' }

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const series = await fetchSeries(language)

  return (
    <ul className="w-full max-w-7xl border rounded-lg divide-y">
      {series.length ? (
        series.map((series) => (
          <li key={series.id} className="px-2 py-1">
            <Link
              href={{
                pathname: `/gaki/series/${series.id}`,
                query: { lang: language },
              }}
              className="flex justify-between"
            >
              <span>{series.name}</span>
              <span>{series.episodes}</span>
            </Link>
          </li>
        ))
      ) : (
        <p>No series found</p>
      )}
    </ul>
  )
}
