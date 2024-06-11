'use server'

import { unstable_noStore as noStore } from 'next/cache'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 50

export async function fetchVideos({
  page,
  order,
  channel,
  shorts,
}: {
  page: number
  order: 'asc' | 'desc'
  channel?: string
  shorts?: boolean
}) {
  const filteredTags = []

  if (shorts) {
    filteredTags.push('short')
  }

  try {
    const data = await prisma.youtubeVideo.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        duration: true,
        channel: { select: { name: true, title: true } },
        tags: { select: { name: true }, orderBy: { name: 'asc' } },
      },
      where: {
        channel: { name: channel },
        tags: { every: { name: { notIn: filteredTags } } },
      },
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
  shorts,
}: {
  channel?: string
  shorts?: boolean
}) {
  noStore()

  const filteredTags = []

  if (shorts) {
    filteredTags.push('short')
  }

  const count = await prisma.youtubeVideo.count({
    where: {
      channel: { name: channel },
      tags: { every: { name: { notIn: filteredTags } } },
    },
  })

  return Math.ceil(count / ITEMS_PER_PAGE)
}

export async function fetchNextVideo(channel: string) {
  let lastVideo

  try {
    lastVideo = await prisma.youtubeVideo.findFirst({
      select: { date: true },
      where: {
        channel: { name: channel },
        tags: { some: { name: 'watched' } },
      },
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch last video')
  }

  try {
    const nextVideo = await prisma.youtubeVideo.findFirst({
      select: {
        id: true,
        title: true,
        date: true,
        duration: true,
        channel: { select: { name: true } },
      },
      where: {
        channel: { name: channel },
        date: { gte: lastVideo?.date },
        tags: { none: { name: 'watched' } },
      },
      orderBy: { date: 'asc' },
    })

    return nextVideo
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch next video')
  }
}
