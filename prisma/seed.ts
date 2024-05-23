import { readFile } from 'fs/promises'

import {
  AnimeStatus,
  AnimeType,
  Language,
  PrismaClient,
  Season,
} from '@prisma/client'
import { Y } from 'vitest/dist/reporters-P7C2ytIv.js'

interface Anime {
  title: string
  episodes: number
  runtime: number
  type: 'movie' | 'ona' | 'ova' | 'tv'
  year: number
  season: 'winter' | 'spring' | 'summer' | 'fall'
  rating: number | null
  status:
    | 'watching'
    | 'rewatching'
    | 'completed'
    | 'on_hold'
    | 'dropped'
    | 'plan_to_watch'
  progress: number | null
  finishDates: number[]
  studios: string[]
  urls: {
    [key: string]: string
  }
}

interface AnimeJSON {
  series: Anime[]
}

interface GakiEpisode {
  n: number | null
  date: string
  title_en: string
  title_ja: string
  talk_segments: string[]
  series: string[]
}

interface GakiSeries {
  key: string
  name_ja: string
  name_en: string
  abbr_ja: string
  abbr_en: string
}

interface GakiJSON {
  episodes: GakiEpisode[]
  series: GakiSeries[]
}

interface YoutubeVideo {
  id: string
  title: string
  date: string
}

interface YoutubeChannel {
  id: string
  name: string
  title: string
  thumbnail: string
  custom_url: string
  uploads_playlist_id: string
  videos: YoutubeVideo[]
}

type YoutubeJSON = YoutubeChannel[]

function languageEnum(lang: Language) {
  switch (lang) {
    case 'en':
      return Language.en
    case 'ja':
      return Language.ja
    default:
      throw new Error(`Unknown language: ${lang}`)
  }
}

function seasonEnum(season: Season) {
  switch (season) {
    case 'winter':
      return Season.winter
    case 'spring':
      return Season.spring
    case 'summer':
      return Season.summer
    case 'fall':
      return Season.fall
    default:
      throw new Error(`Unknown season: ${season}`)
  }
}

function animeStatusEnum(status: AnimeStatus) {
  switch (status) {
    case 'watching':
      return AnimeStatus.watching
    case 'rewatching':
      return AnimeStatus.rewatching
    case 'completed':
      return AnimeStatus.completed
    case 'on_hold':
      return AnimeStatus.on_hold
    case 'dropped':
      return AnimeStatus.dropped
    case 'plan_to_watch':
      return AnimeStatus.plan_to_watch
    default:
      throw new Error(`Unknown status: ${status}`)
  }
}

function animeTypeEnum(type: string) {
  switch (type) {
    case 'movie':
      return AnimeType.movie
    case 'ona':
      return AnimeType.ona
    case 'ova':
      return AnimeType.ova
    case 'tv':
      return AnimeType.tv
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

const prisma = new PrismaClient()

async function seedAnime(deleteRecords = false) {
  const raw = await readFile('./prisma/anime.json', 'utf-8')
  const data = JSON.parse(raw) as AnimeJSON

  if (deleteRecords) {
    await prisma.animeFinishDate.deleteMany({})
    await prisma.animeStudio.deleteMany({})
    await prisma.anime.deleteMany({})
  }

  for (const anime of data.series) {
    await prisma.anime.create({
      data: {
        title: anime.title,
        episodes: anime.episodes,
        runtime: anime.runtime,
        type: animeTypeEnum(anime.type),
        year: anime.year,
        season: seasonEnum(anime.season),
        rating: anime.rating,
        status: animeStatusEnum(anime.status),
        progress: anime.progress,
        studios: {
          connectOrCreate: anime.studios.map((studio) => ({
            where: { name: studio },
            create: { name: studio },
          })),
        },
        finishDates: {
          create: anime.finishDates.map((ts) => ({
            date: new Date(ts * 1000),
          })),
        },
      },
    })
  }

  console.log('Seeded database')
}

async function seedGaki(deleteRecords = false) {
  const raw = await readFile('./prisma/gaki-no-tsukai.json', 'utf-8')
  const data = JSON.parse(raw) as GakiJSON

  if (deleteRecords) {
    await prisma.gakiEpisodeTitle.deleteMany({})
    await prisma.gakiSeriesName.deleteMany({})
    await prisma.gakiEpisode.deleteMany({})
    await prisma.gakiSeries.deleteMany({})
  }

  const seriesIds = await prisma.$transaction(
    data.series.map((series) =>
      prisma.gakiSeries.create({
        data: {
          text: {
            create: [
              {
                language: 'en',
                name: series.name_en,
                abbreviation: series.abbr_en,
              },
              {
                language: 'ja',
                name: series.name_ja,
                abbreviation: series.abbr_ja,
              },
            ],
          },
        },
      })
    )
  )

  // Map the returned series IDs to their keys
  const series = {} as Record<string, number>
  for (let i = 0; i < seriesIds.length; i++) {
    series[data.series[i].key] = seriesIds[i].id
  }

  await prisma.$transaction(
    data.episodes.map((episode) =>
      prisma.gakiEpisode.create({
        data: {
          number: episode.n,
          text: {
            create: [
              // Only create titles if they exist
              // If there is no title, an empty array will get expanded instead of the object
              ...(episode.title_ja
                ? [{ language: languageEnum('ja'), title: episode.title_ja }]
                : []),
              ...(episode.title_en
                ? [{ language: languageEnum('en'), title: episode.title_en }]
                : []),
            ],
          },
          date: new Date(episode.date),
          series: {
            connect: episode.series.map((s) => ({ id: series[s] })),
          },
        },
      })
    )
  )

  console.log('Seeded database')
}

async function seedYoutube(deleteRecords = false) {
  const raw = await readFile('./prisma/youtube.json', 'utf-8')
  const data = JSON.parse(raw) as YoutubeJSON

  if (deleteRecords) {
    await prisma.youtubeVideoTag.deleteMany({})
    await prisma.youtubeVideo.deleteMany({})
    await prisma.youtubeChannel.deleteMany({})
  }

  await prisma.$transaction(
    data.map((channel) =>
      prisma.youtubeChannel.create({
        data: {
          id: channel.id,
          name: channel.name,
          title: channel.title,
          thumbnail: channel.thumbnail,
          customUrl: channel.custom_url,
          uploadsPlaylistId: channel.uploads_playlist_id,
          videos: {
            create: channel.videos.map((video) => ({
              id: video.id,
              title: video.title,
              date: new Date(video.date),
            })),
          },
        },
      })
    )
  )

  console.log('Seeded database')
}

async function main() {
  // await seedAnime(true)
  // await seedGaki(true)
  await seedYoutube(true)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
