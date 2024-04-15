import type { Episodes, Language } from '@/lib/gaki/definitions'
import { SeriesLabel } from '@/ui/gaki/episodes/series-label'

export default function Table({
  episodes,
  language,
}: {
  episodes: Episodes
  language: Language
}) {
  const hasEpisodes = Array.isArray(episodes) && episodes.length > 0

  return hasEpisodes ? (
    <div className="w-full max-w-7xl border rounded-lg dark:border-white/10">
      <table>
        <tbody className="divide-y dark:divide-white/10">
          {episodes.map((ep) => (
            <tr key={ep.id}>
              <td className="px-2 py-1.5 ">{ep.number ?? '-'}</td>
              <td className="py-1.5 w-full">
                <div className="flex flex-col justify-between items-start sm:flex-row sm:items-center sm:space-x-2">
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
