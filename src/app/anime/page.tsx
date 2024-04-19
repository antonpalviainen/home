import { Suspense } from 'react'

import type { SearchParams } from '@/lib/anime/definitions'
import { optionsSchema, parseParam } from '@/lib/anime/utils'
import Table from '@/ui/anime/table'

export default function Page({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const parsedOptions = optionsSchema.safeParse({
    status: parseParam(searchParams?.status),
    type: parseParam(searchParams?.type),
    year: parseParam(searchParams?.year),
    season: parseParam(searchParams?.season),
    rating: parseParam(searchParams?.rating),
    studios: parseParam(searchParams?.studios),
    sort: searchParams?.sort,
    direction: searchParams?.direction,
  })
  const options = parsedOptions.success
    ? parsedOptions.data
    : ({ sort: 'status', direction: 'asc' } as const)

  if (!parsedOptions.success) {
    console.error('Invalid search parameters:', parsedOptions.error)
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table options={options} />
    </Suspense>
  )
}
