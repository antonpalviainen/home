import type { Metadata } from 'next'

import { fetchEpisodes } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'
import EpisodeTable from '@/ui/gaki/episodes/table'

export const metadata: Metadata = { title: 'Episodes' }

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string; page?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const currentPage = Number(searchParams?.page) || 1
  const episodes = await fetchEpisodes(language, currentPage)

  return <EpisodeTable language={language} currentPage={currentPage} />
}
