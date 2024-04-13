import { Locale } from './i18n'
import prisma from './prisma'

function resolveLanguage(locale: Locale) {
  return locale === 'ja' ? 'JA' : 'EN'
}

export async function fetchEpisodes(locale: Locale) {
  const language = resolveLanguage(locale)

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

export async function fetchSeries(locale: Locale) {
  const language = resolveLanguage(locale)

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
