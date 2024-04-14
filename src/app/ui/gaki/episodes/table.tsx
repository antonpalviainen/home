import { fetchEpisodes } from '@/lib/gaki/data'
import type { Language } from '@/lib/gaki/definitions'
import Table from '@/ui/gaki/table'

export default async function EpisodeTable({
  language,
  currentPage,
}: {
  language: Language
  currentPage: number
}) {
  const episodes = await fetchEpisodes(language, currentPage)

  return <Table episodes={episodes} language={language} />
}
