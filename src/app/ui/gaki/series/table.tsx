import { fetchSeriesEpisodes } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'
import Table from '@/ui/gaki/table'

export default async function SeriesTable({
  seriesId,
  language,
}: {
  seriesId: number
  language: Language
}) {
  const episodes = await fetchSeriesEpisodes(seriesId, language)

  return <Table episodes={episodes} language={language} />
}
