import type { Metadata } from 'next'
import { Suspense } from 'react'

import { fetchEpisodesPages } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'
import EpisodeTable from '@/ui/gaki/episodes/table'
import Pagination from '@/ui/gaki/pagination'
import Search from '@/ui/gaki/search'
import { EpisodeTableSkeleton } from '@/ui/gaki/skeletons'

export const metadata: Metadata = { title: 'Episodes' }

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string; query?: string; page?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const totalPages = await fetchEpisodesPages(query)

  return (
    <div className="w-full flex flex-col items-center">
      <div className=" w-80 mb-4 flex justify-center">
        <Search placeholder="Search episodes" />
      </div>
      <div className="mb-4 flex justify-center">
        <Pagination totalPages={totalPages} positionOnPage="top" />
      </div>
      <Suspense
        key={language + currentPage}
        fallback={<EpisodeTableSkeleton />}
      >
        <EpisodeTable
          language={language}
          query={query}
          currentPage={currentPage}
        />
      </Suspense>
      <div className="mt-4 flex justify-center">
        <Pagination totalPages={totalPages} positionOnPage="bottom" />
      </div>
    </div>
  )
}
