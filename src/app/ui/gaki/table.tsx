import { SeriesLabel } from './episodes/series-label'

import type { Episodes, Language } from '@/lib/gaki/definitions'

export default function Table({
  episodes,
  language,
}: {
  episodes: Episodes
  language: Language
}) {
  const hasEpisodes = Array.isArray(episodes) && episodes.length > 0

  return hasEpisodes ? (
    <div className="w-full border rounded-lg dark:border-neutral-700">
      <table>
        <tbody className="divide-y dark:divide-neutral-700">
          {episodes.map((ep) => (
            <tr key={ep.id} className="">
              <td className="px-2 py-1.5 ">{ep.number ?? '-'}</td>
              <td className="py-1.5 w-full">
                <div className="flex justify-between">
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
                </div>
              </td>
              <td className="px-2 py-1.5 text-right whitespace-nowrap ">
                {ep.date.toISOString().slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No episodes found</p>
  )
}
