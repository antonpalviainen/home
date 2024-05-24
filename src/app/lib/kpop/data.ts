'use server'

import { unstable_noStore as noStore } from 'next/cache'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 50

export async function fetchAllVideos({
  order,
  page,
  tags,
}: {
  order: 'asc' | 'desc'
  page: number
  tags?: string[]
}) {
  try {
    const data = await prisma.youtubeVideo.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        channel: { select: { name: true } },
        tags: { select: { name: true } },
      },
      where: { OR: tags?.map((name) => ({ tags: { some: { name } } })) },
      orderBy: { date: order },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch videos')
  }
}

export async function fetchChannelVideos({
  name,
  order,
  page,
}: {
  name: string
  order: 'asc' | 'desc'
  page: number
}) {
  try {
    const data = await prisma.youtubeVideo.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        channel: { select: { name: true } },
        tags: { select: { name: true } },
      },
      where: { channel: { name } },
      orderBy: { date: order },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch videos')
  }
}

export async function fetchVideosPages({
  channel,
  tags,
}: {
  channel?: string
  tags?: string[]
}) {
  noStore()

  const count = await prisma.youtubeVideo.count({
    where: {
      channel: { name: channel },
      OR: tags?.map((name) => ({ tags: { some: { name } } })),
    },
  })

  return Math.ceil(count / ITEMS_PER_PAGE)
}
