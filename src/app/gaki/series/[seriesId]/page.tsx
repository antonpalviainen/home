import { fetchSeriesEpisodes } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'
import EpisodeTable from '@/ui/gaki/table'

export default async function Page({
  params,
  searchParams,
}: {
  params: { seriesId: string }
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const episodes = await fetchSeriesEpisodes(
    parseInt(params.seriesId),
    language
  )

  return <EpisodeTable episodes={episodes} />
}
