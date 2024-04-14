import { Language } from './definitions'

import prisma from '@/lib/prisma'

export async function fetchEpisodes(language: Language, skip = 0, take = 100) {
  const languageOrder = language === 'en' ? 'asc' : 'desc'

  try {
    const data = await prisma.episode.findMany({
      include: {
        text: {
          select: { title: true },
          // Select all languages for now
          // where: { language },
          orderBy: { language: languageOrder },
        },
        series: {
          include: {
            text: {
              select: { id: true, name: true, abbreviation: true },
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
  const languageOrder = language === 'en' ? 'asc' : 'desc'

  try {
    const data = await prisma.series.findFirst({
      where: { id },
      include: {
        episodes: {
          include: {
            text: {
              select: { title: true },
              // Select all languages for now
              // where: { language },
              orderBy: { language: languageOrder },
            },
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
      title: row.text[0]?.title || row.text[1]?.title,
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

    flattenedData.sort((a, b) => a.name.localeCompare(b.name))

    return flattenedData
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch series')
  }
}
