import Link from 'next/link'

import { fetchSeries } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'

export async function SeriesList({ language }: { language: Language }) {
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
