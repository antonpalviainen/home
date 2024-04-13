import Link from 'next/link'

import { fetchSeries } from '@/lib/gaki-no-tsukai/data'
import { resolveLanguage } from '@/lib/gaki-no-tsukai/utils'

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string; page?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const series = await fetchSeries(language)

  return (
    <ul>
      {series.map((series) => (
        <li key={series.id}>
          <Link
            href={`/gaki-no-tsukai/series/${series.id}`}
            className="flex justify-between"
          >
            <span>{series.names[0].text}</span>
            <span>{series._count.episodes}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
