import type { Metadata } from 'next'
import { Suspense } from 'react'

import { resolveLanguage } from '@/lib/gaki/utils'
import { SeriesList } from '@/ui/gaki/series/list'
import { SeriesListSkeleton } from '@/ui/gaki/skeletons'

export const metadata: Metadata = { title: 'Series' }

export default async function Page({
  searchParams,
}: {
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)

  return (
    <div className="w-full max-w-7xl flex justify-center">
      <Suspense key={language} fallback={<SeriesListSkeleton />}>
        <SeriesList language={language} />
      </Suspense>
    </div>
  )
}
