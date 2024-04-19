import { Suspense } from 'react'
import { z } from 'zod'

import type { Options, SearchParams } from '@/lib/anime/definitions'
import Table from '@/ui/anime/table'

const SortOptionsSchema: z.ZodType<Options> = z.object({
  status: z
    .array(
      z.enum([
        'watching',
        'rewatching',
        'completed',
        'on_hold',
        'dropped',
        'plan_to_watch',
      ])
    )
    .optional(),
  type: z.array(z.enum(['movie', 'ona', 'ova', 'tv'])).optional(),
  year: z.array(z.number()).optional(),
  season: z.array(z.enum(['winter', 'spring', 'summer', 'fall'])).optional(),
  rating: z.array(z.number().min(0).max(10)).optional(),
  studios: z.array(z.string()).optional(),
  sort: z
    .enum([
      'status',
      'title',
      'runtime',
      'type',
      'premiered',
      'rating',
      'progress',
    ])
    .default('status'),
  direction: z.enum(['asc', 'desc']).default('asc'),
})

function parseParam(param?: string) {
  return param ? decodeURIComponent(param).split(',') : undefined
}

export default function Page({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const parsedOptions = SortOptionsSchema.safeParse({
    status: parseParam(searchParams?.status),
    type: parseParam(searchParams?.type),
    year: parseParam(searchParams?.year)?.map(Number),
    season: parseParam(searchParams?.season),
    rating: parseParam(searchParams?.rating)?.map(Number),
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
