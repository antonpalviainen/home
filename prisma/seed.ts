import { readFile } from 'fs/promises'

import { PrismaClient } from '@prisma/client'

interface Episode {
  n: number | null
  date: string
  title_en: string
  title_ja: string
  talk_segments: string[]
  series: string[]
}

interface Series {
  key: string
  name_ja: string
  name_en: string
  abbr_ja: string
  abbr_en: string
}

interface GakiJSON {
  episodes: Episode[]
  series: Series[]
}

const prisma = new PrismaClient()

async function seed() {
  const raw = await readFile('./prisma/gaki-no-tsukai.json', 'utf-8')
  const data = JSON.parse(raw) as GakiJSON

  await prisma.episodeTitle.deleteMany({})
  await prisma.seriesName.deleteMany({})
  await prisma.episode.deleteMany({})
  await prisma.series.deleteMany({})

  const seriesIds = await prisma.$transaction(
    data.series.map((series) =>
      prisma.series.create({
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
      prisma.episode.create({
        data: {
          number: episode.n,
          text: {
            create: [
              // Only create titles if they exist
              // If there is no title, an empty array will get expanded instead of the object
              ...(episode.title_ja
                ? [{ language: 'ja', title: episode.title_ja }]
                : []),
              ...(episode.title_en
                ? [{ language: 'en', title: episode.title_en }]
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

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(
    void (async () => {
      await prisma.$disconnect()
    })()
  )
