import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'

import { fetchSeries } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'

const getCachedSeries = cache(
  async (language: Language) => await fetchSeries(language),
  ['gaki-series']
)

export async function SeriesList({ language }: { language: Language }) {
  const series = await getCachedSeries(language)

  return series.length ? (
    <ul className="w-full rounded-lg md:border md:divide-y dark:border-white/10 dark:divide-white/10">
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
