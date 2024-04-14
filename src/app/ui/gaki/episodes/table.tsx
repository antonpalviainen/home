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
    <table className="min-w-full border">
      <tbody>
        {episodes.map((ep) => (
          <tr key={ep.id} className="border-b last-of-type:border-none">
            <td className="px-2 py-1.5">{ep.number ?? '-'}</td>
            <td className="py-1.5 flex justify-between items-center">
              <span>{ep.title || '-'}</span>
              <span className="space-x-1">
                {ep.series.map((series) => (
                  <SeriesLabel
                    key={series.id}
                    series={series}
                    language={language}
                  />
                ))}
              </span>
            </td>
            <td className="px-2 py-1.5 text-right whitespace-nowrap">
              {ep.date.toISOString().slice(0, 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No episodes found</p>
  )
}
