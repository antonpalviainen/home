import 'server-only'

import prisma from '@/lib/prisma'

export async function fetchFilteredAnime() {
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
          select: { id: true, name: true },
        },
        finishDates: {
          select: { date: true },
        },
      },
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch anime')
  }
}
