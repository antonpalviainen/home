// import 'server-only'

import { Options } from '@/lib/anime/definitions'
import { generateFilter, generateSortOrder } from '@/lib/anime/utils'
import prisma from '@/lib/prisma'

export async function fetchFilteredAnime(options: Options) {
  const orderBy = generateSortOrder({
    sort: options.sort,
    direction: options.direction,
  })
  const where = generateFilter(options)

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
      where,
      orderBy,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch anime')
  }
}

export async function fetchStudios() {
  try {
    const data = await prisma.animeStudio.findMany({
      select: {
        name: true,
      },
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch studios')
  }
}

export async function fetchDistinctValues(
  field: 'status' | 'type' | 'year' | 'season' | 'rating'
) {
  try {
    const data = await prisma.anime.findMany({
      select: {
        [field]: true,
      },
      distinct: [field],
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch distinct values')
  }
}

export async function fetchAnimeStatuses() {
  try {
    const data = await prisma.anime.findMany({
      select: {
        status: true,
      },
      distinct: ['status'],
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch anime statuses')
  }
}
