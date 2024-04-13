import { readFile } from 'fs/promises'

import { PrismaClient } from '@prisma/client'

interface Episode {
  n: number | null
  date: string
  title_en: string
  title_jp: string
  talk_segments: string[]
  series: string[]
}

type Series = Record<string, { jp: string; en: string }>

interface GakiJSON {
  episodes: Episode[]
  series: Series
}

const prisma = new PrismaClient()

async function seed() {
  const raw = await readFile('./prisma/gaki-no-tsukai-data.json', 'utf-8')
  const data = JSON.parse(raw) as GakiJSON

  console.log('Seeding database')

  await prisma.episode.deleteMany({})
  await prisma.series.deleteMany({})
  await prisma.phrase.deleteMany({})

  const seriesIds = await prisma.$transaction(
    Object.values(data.series).map((series) =>
      prisma.series.create({
        data: {
          names: {
            create: [
              { language: 'JA', text: series.jp },
              { language: 'EN', text: series.en },
            ],
          },
        },
      })
    )
  )

  const seriesKeys = Object.keys(data.series as Series)
  const series = {} as Record<string, number>

  for (let i = 0; i < seriesKeys.length; i++) {
    series[seriesKeys[i]] = seriesIds[i].id
  }

  console.log('Seeded series')

  await prisma.$transaction(
    data.episodes.map((episode) =>
      prisma.episode.create({
        data: {
          number: episode.n,
          titles: {
            create: [
              { language: 'JA', text: episode.title_jp },
              { language: 'EN', text: episode.title_en },
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

  console.log('Seeded episodes')

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
