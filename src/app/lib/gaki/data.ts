import 'server-only'

import { Language } from '@/lib/gaki/definitions'
import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 100

export async function fetchFilteredEpisodes(
  language: Language,
  query: string,
  currentPage: number
) {
  const languageOrder = language === 'en' ? 'asc' : 'desc'
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const data = await prisma.gakiEpisode.findMany({
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
      where: {
        text: { some: { title: { contains: query } } },
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    })

    const flattenedData = data.map((row) => ({
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
    throw new Error('Failed to fetch episodes')
  }
}

export async function fetchEpisodesPages(query: string) {
  try {
    const data = await prisma.gakiEpisode.count({
      where: { text: { some: { title: { contains: query } } } },
    })
    const totalPages = Math.ceil(data / ITEMS_PER_PAGE)

    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of episodes')
  }
}

export async function fetchSeriesEpisodes(id: number, language: Language) {
  const languageOrder = language === 'en' ? 'asc' : 'desc'

  try {
    const data = await prisma.gakiSeries.findFirst({
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
    const data = await prisma.gakiSeries.findMany({
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

export async function fetchSeriesName(id: number, language: Language) {
  try {
    const data = await prisma.gakiSeries.findFirst({
      where: { id },
      include: {
        text: { select: { name: true }, where: { language } },
      },
    })

    return data?.text[0].name
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch series name')
  }
}
