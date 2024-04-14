import type { Metadata } from 'next'

import { fetchEpisodesPages } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'
import Pagination from '@/ui/gaki/episodes/pagination'
import EpisodeTable from '@/ui/gaki/episodes/table'

export const metadata: Metadata = { title: 'Episodes' }

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string; page?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchEpisodesPages()

  return (
    <div>
      <div className="mb-3 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <EpisodeTable language={language} currentPage={currentPage} />
      <div className="mt-3 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
