import 'server-only'

import { Prisma } from '@prisma/client'

import prisma from '@/lib/prisma'

type OrderField =
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'
  | 'status'

function generateSortOrder(
  field: OrderField = 'status',
  order: Prisma.SortOrder = 'asc'
) {
  const sortOrder =
    order === 'asc' ? Prisma.SortOrder.asc : Prisma.SortOrder.desc
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
      fields.push({ rating: sortOrder })
      break
    case 'progress':
      fields.push({ progress: sortOrder })
      break
  }

  fields.push({ title: sortOrder })

  return fields
}

export async function fetchFilteredAnime(
  orderField: OrderField = 'status',
  orderDirection: Prisma.SortOrder = 'asc'
) {
  const orderBy = generateSortOrder(orderField, orderDirection)

  try {
    const data = await prisma.anime.findMany({
      select: {
        id: true,
        title: true,
        episodes: true,
        runtime: true,
        type: true,
        year: true,
        season: true,
        rating: true,
        progress: true,
        status: true,
        studios: {
          select: { name: true },
        },
        finishDates: {
          select: { date: true },
        },
      },
      orderBy,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch anime')
  }
}
