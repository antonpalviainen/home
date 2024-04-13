import { Language } from '@/lib/gaki-no-tsukai/definitions'
import prisma from '@/lib/prisma'

export async function fetchEpisodes(language: Language) {
  const episodes = await prisma.episode.findMany({
    include: {
      series: {
        select: {
          names: {
            where: { language },
            select: { text: true },
          },
        },
      },
    },
  })

  return episodes
}

export async function fetchSeries(language: Language) {
  const series = await prisma.series.findMany({
    include: {
      names: {
        where: { language },
        select: { text: true },
      },
      _count: { select: { episodes: true } },
    },
  })

  return series
}
