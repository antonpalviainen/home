import { Suspense } from 'react'
import { z } from 'zod'

import type { Options, SearchParams } from '@/lib/anime/definitions'
import Table from '@/ui/anime/table'

const SortOptionsSchema = z.object({
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
  year: z.array(z.coerce.number()).optional(),
  season: z.array(z.enum(['winter', 'spring', 'summer', 'fall'])).optional(),
  rating: z
    .array(
      z.union([
        z.coerce.number().min(1).max(10),
        z.literal('null').transform(() => null),
      ])
    )
    .optional(),
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

type T = z.infer<typeof SortOptionsSchema>['rating']

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
