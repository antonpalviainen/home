import { AnimeStatus, AnimeType, Prisma } from '@prisma/client'

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

export function generateSortOrder(
  field: string = 'status',
  order: string = 'asc'
) {
  const sortOrder =
    order === 'desc' ? Prisma.SortOrder.desc : Prisma.SortOrder.asc
  const fields = []

  switch (field) {
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
  }

  fields.push({ title: sortOrder })

  return fields
}

export function getStatusColor(status: AnimeStatus): string {
  switch (status) {
    case AnimeStatus.watching:
      return 'bg-[#2db039]'
    case AnimeStatus.rewatching:
    case AnimeStatus.completed:
      // rewatching and completed have the same color
      return 'bg-[#26448f]'
    case AnimeStatus.on_hold:
      return 'bg-[#f1c83e]'
    case AnimeStatus.dropped:
      return 'bg-[#a12f31]'
    case AnimeStatus.plan_to_watch:
      return 'bg-[#c3c3c3]'
  }
}

export function isCompleted(status: AnimeStatus) {
  return status === AnimeStatus.completed
}
