import { Suspense } from 'react'
import { z } from 'zod'

import { Options } from '@/lib/anime/definitions'
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

export default function Page({
  searchParams,
}: {
  searchParams?: Options
}) {
  const parsedOptions = SortOptionsSchema.safeParse({
    status: searchParams?.status && searchParams?.status.split(','),
    type: searchParams?.type && searchParams?.type.split(','),
    year: searchParams?.year && searchParams?.year.split(',').map(Number),
    season: searchParams?.season && searchParams?.season.split(','),
    rating: searchParams?.rating && searchParams?.rating.split(',').map(Number),
    studios: searchParams?.studios && searchParams?.studios.split(','),
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
