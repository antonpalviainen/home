// import 'server-only'

import type { Options } from '@/lib/anime/definitions'
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
      orderBy: { name: 'asc' },
    })

    return data.map((studio) => studio.name)
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch studios')
  }
}

export async function fetchYears() {
  try {
    const data = await prisma.anime.findMany({
      select: {
        year: true,
      },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    })

    return data.map((item) => item.year.toString())
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch years')
  }
}
