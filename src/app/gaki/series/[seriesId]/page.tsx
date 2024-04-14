import { Suspense } from 'react'

import { resolveLanguage } from '@/lib/gaki/utils'
import SeriesTable from '@/ui/gaki/series/table'
import { EpisodeTableSkeleton } from '@/ui/gaki/skeletons'

export default async function Page({
  params,
  searchParams,
}: {
  params: { seriesId: string }
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)

  return (
    <Suspense
      key={language + params.seriesId}
      fallback={<EpisodeTableSkeleton />}
    >
      <SeriesTable seriesId={Number(params.seriesId)} language={language} />
    </Suspense>
  )
}
