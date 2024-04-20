import { AnimeStatus, AnimeType, Prisma } from '@prisma/client'
import { z } from 'zod'

import type {
  FilterOptions,
  GeneratedFilters,
  SortOptions,
} from '@/lib/anime/definitions'
import { capitalize } from '@/lib/utils'

export function formatType(type: AnimeType) {
  switch (type) {
    case AnimeType.tv:
    case AnimeType.ova:
    case AnimeType.ona:
      // tv, ova, and ona have the same format
      return type.toUpperCase()
    case AnimeType.movie:
      return capitalize(type)
  }
}

export function generateFilter(options: FilterOptions) {
  const filters: GeneratedFilters = {}

  if (options.status) {
    filters.status = { in: options.status }
  }
  if (options.type) {
    filters.type = { in: options.type }
  }
  if (options.year) {
    filters.year = { in: options.year }
  }
  if (options.season) {
    filters.season = { in: options.season }
  }
  if (options.rating) {
    // Filter out null values
    const ratingNumbers = options.rating.flatMap((r) => (r !== null ? r : []))

    if (options.rating.includes(null)) {
      if (options.rating.length === 1) {
        filters.rating = null
      } else {
        filters.OR = [{ rating: null }, { rating: { in: ratingNumbers } }]
      }
    } else {
      filters.rating = { in: ratingNumbers }
    }
  }
  if (options.studios) {
    filters.studios = { some: { name: { in: options.studios } } }
  }

  return filters
}

export function generateSortOrder({ sort, direction }: SortOptions) {
  const sortOrder =
    direction === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc
  const fields = []

  switch (sort) {
    case 'status':
      fields.push({ status: sortOrder })
      break
    case 'runtime':
      fields.push({ runtime: sortOrder })
      break
    case 'type':
      fields.push({ type: sortOrder })
      break
    case 'premiered':
      fields.push({ year: sortOrder }, { season: sortOrder })
      break
    case 'rating':
      fields.push({
        rating: { sort: sortOrder, nulls: Prisma.NullsOrder.last },
      })
      break
    case 'progress':
      fields.push({ progress: sortOrder })
      break
    // Default "case" sorts only by title
  }

  // Always add sorting by title
  fields.push({ title: sortOrder })

  return fields
}

export function getStatusColor(status: AnimeStatus): string {
  switch (status) {
    case AnimeStatus.watching:
      return 'bg-[#2db039]/65'
    case AnimeStatus.rewatching:
    case AnimeStatus.completed:
      // rewatching and completed have the same color
      return 'bg-[#26448f]/65'
    case AnimeStatus.on_hold:
      return 'bg-[#f1c83e]/65'
    case AnimeStatus.dropped:
      return 'bg-[#a12f31]/65'
    case AnimeStatus.plan_to_watch:
      return 'bg-[#c3c3c3]/65'
  }
}

export function isCompleted(status: AnimeStatus) {
  return status === AnimeStatus.completed
}

export const optionsSchema = z.object({
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

export function parseParam(param?: string | null) {
  return param ? decodeURIComponent(param).split(',') : undefined
}
