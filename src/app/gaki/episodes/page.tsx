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
    <div className="w-full">
      <div className="mb-4 flex justify-center md:mb-5">
        <Pagination totalPages={totalPages} />
      </div>
      <EpisodeTable language={language} currentPage={currentPage} />
      <div className="mt-4 flex justify-center md:mt-5">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
