import type { Metadata } from 'next'
import { Suspense } from 'react'

import { fetchSeriesName } from '@/lib/gaki/data'
import { resolveLanguage } from '@/lib/gaki/utils'
import SeriesTable from '@/ui/gaki/series/table'
import { EpisodeTableSkeleton } from '@/ui/gaki/skeletons'

interface Props {
  params: { seriesId: string }
  searchParams?: { lang?: string }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const language = resolveLanguage(searchParams?.lang)
  const name = await fetchSeriesName(Number(params.seriesId), language)

  return {
    title: name,
  }
}

export default async function Page({ params, searchParams }: Props) {
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
