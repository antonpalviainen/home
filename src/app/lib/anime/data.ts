import 'server-only'

import { generateSortOrder } from '@/lib/anime/utils'
import prisma from '@/lib/prisma'

export async function fetchFilteredAnime(
  orderField: string,
  orderDirection: string
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
