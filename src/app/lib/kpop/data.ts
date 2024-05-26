'use server'

import { unstable_noStore as noStore } from 'next/cache'

import prisma from '@/lib/prisma'

const ITEMS_PER_PAGE = 50

export async function fetchVideos({
  page,
  order,
  channel,
}: {
  page: number
  order: 'asc' | 'desc'
  channel?: string
}) {
  try {
    const data = await prisma.youtubeVideo.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        duration: true,
        channel: { select: { name: true, title: true } },
        tags: { select: { name: true } },
      },
      where: { channel: { name: channel } },
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

export async function fetchVideosPages({ channel }: { channel?: string }) {
  noStore()

  const count = await prisma.youtubeVideo.count({
    where: {
      channel: { name: channel },
    },
  })

  return Math.ceil(count / ITEMS_PER_PAGE)
}
