import 'server-only'

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
          select: { id: true, name: true },
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

export async function fetchAnimeById(id: number) {
  try {
    const data = await prisma.anime.findFirst({
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
      where: { id },
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
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    })

    return data
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

export async function fetchRatingData() {
  try {
    const data = await prisma.anime.groupBy({
      by: ['rating'],
      _count: {
        _all: true,
      },
      orderBy: { rating: { sort: 'desc', nulls: 'last' } },
    })

    return data.map((item) => ({
      rating: item.rating?.toString() ?? '-',
      count: item._count._all,
    }))
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch rating data')
  }
}

interface FinishData {
  dates: { date: Date; type: 'watch' | 'rewatch' }[]
  avg: number
}

export async function fetchTitleFinishData() {
  try {
    const rawData = await prisma.$queryRaw<{ dates: Date[] }[]>`
      SELECT array_agg(date_trunc('month', "date")) as "dates"
      FROM "AnimeFinishDate"
      WHERE date >= '2016-01-01'
      GROUP BY "animeId"
      ORDER BY "animeId"
    `

    const data: FinishData = {
      dates: [],
      avg:
        rawData.reduce((acc, item) => acc + item.dates.length, 0) /
        rawData.length,
    }

    for (const { dates } of rawData) {
      for (let i = 0; i < dates.length; i++) {
        data.dates.push({
          date: dates[i],
          type: i === 0 ? 'watch' : 'rewatch',
        })
      }
    }

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch title finish data')
  }
}
