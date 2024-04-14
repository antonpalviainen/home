import { SeriesLabel } from './series-label'

import { fetchEpisodes } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'

export default async function EpisodeTable({
  language,
  currentPage,
}: {
  language: Language
  currentPage: number
}) {
  const episodes = await fetchEpisodes(language, currentPage)

  const hasEpisodes = Array.isArray(episodes) && episodes.length > 0

  return hasEpisodes ? (
    <ul>
      {episodes.map((ep) => (
        <li key={ep.id} className="flex px-2 py-1.5">
          <span className="min-w-10">{ep.number ?? '-'}</span>
          <span className="flex flex-1 justify-between items-center px-2">
            <span>{ep.title || '-'}</span>
            <div className="inline ml-2 space-x-2">
              {ep.series.map((series) => (
                <SeriesLabel
                  key={series.id}
                  series={series}
                  language={language}
                />
              ))}
            </div>
          </span>
          <span className=" min-w-24 whitespace-nowrap">
            {ep.date.toISOString().slice(0, 10)}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No episodes found</p>
  )
}
