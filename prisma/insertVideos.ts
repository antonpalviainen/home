import { readFile } from 'fs/promises'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Channel {
  id: string
  name: string
  title: string
  description: string
  thumbnail: string
  custom_url: string
  uploads_playlist_id: string
}

interface Video {
  id: string
  title: string
  date: string
  duration: string
  description: string
  channel: Channel
}

async function insertVideos() {
  const raw = await readFile('./prisma/youtube.json', 'utf-8')
  const data = JSON.parse(raw) as Video[]

  try {
    await prisma.$transaction(
      data.map((video) =>
        prisma.youtubeVideo.create({
          data: {
            id: video.id,
            title: video.title,
            date: new Date(video.date),
            duration: video.duration,
            channel: {
              connectOrCreate: {
                where: { id: video.channel.id },
                create: {
                  id: video.channel.id,
                  name: video.channel.name,
                  title: video.channel.title,
                  thumbnail: video.channel.thumbnail,
                  customUrl: video.channel.custom_url,
                  uploadsPlaylistId: video.channel.uploads_playlist_id,
                },
              },
            },
          },
        })
      )
    )
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to insert videos')
  }
}

async function main() {
  await insertVideos()
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
