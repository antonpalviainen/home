import { fetchFilteredEpisodes } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'
import Table from '@/ui/gaki/table'

export default async function EpisodeTable({
  language,
  query,
  currentPage,
}: {
  language: Language
  query: string
  currentPage: number
}) {
  const episodes = await fetchFilteredEpisodes(language, query, currentPage)

  return <Table episodes={episodes} language={language} />
}
