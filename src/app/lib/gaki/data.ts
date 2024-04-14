import { PrismaClient } from '@prisma/client'

import { Language } from './definitions'

const prisma = new PrismaClient()

export async function fetchEpisodes(language: Language, skip = 0, take = 100) {
  try {
    const data = await prisma.episode.findMany({
      include: {
        text: { select: { title: true }, where: { language } },
        series: {
          include: {
            text: {
              select: { id: true, name: true, abbreviation: true },
              where: { language },
            },
          },
        },
      },
      skip,
      take,
    })

    const flattenedData = data.map((row) => ({
      id: row.id,
      number: row.number,
      title: row.text[0].title,
      date: row.date,
      series: row.series.map((series) => ({
        id: series.id,
        name: series.text[0].name,
        abbreviation: series.text[0].abbreviation,
      })),
    }))

    return flattenedData
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch episodes')
  }
}

export async function fetchSeriesEpisodes(id: number, language: Language) {
  try {
    const data = await prisma.series.findFirst({
      where: { id },
      include: {
        episodes: {
          include: {
            text: { select: { title: true }, where: { language } },
            series: {
              include: {
                text: {
                  select: { id: true, name: true, abbreviation: true },
                  where: { language },
                },
              },
            },
          },
        },
      },
    })

    if (!data?.episodes) return []

    const flattenedData = data.episodes.map((row) => ({
      id: row.id,
      number: row.number,
      title: row.text[0]?.title,
      date: row.date,
      series: row.series.map((series) => ({
        id: series.id,
        name: series.text[0].name,
        abbreviation: series.text[0].abbreviation,
      })),
    }))

    return flattenedData
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch series episodes')
  }
}

export async function fetchSeries(language: Language) {
  try {
    const data = await prisma.series.findMany({
      include: {
        text: {
          select: { name: true },
          where: { language },
        },
        _count: { select: { episodes: true } },
      },
    })

    const flattenedData = data.map((row) => ({
      id: row.id,
      name: row.text[0].name,
      episodes: row._count.episodes,
    }))

    return flattenedData
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch series')
  }
}
