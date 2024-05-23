import prisma from '@/lib/prisma'

export async function fetchAllVideos({
  order,
  page,
  tags,
}: {
  order: 'asc' | 'desc'
  page: number
  tags?: string[]
}) {
  const take = 50

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
      take,
      skip: (page - 1) * take,
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
  const take = 50

  try {
    const data = await prisma.youtubeChannel.findFirst({
      where: { name },
      select: {
        videos: {
          select: {
            id: true,
            title: true,
            date: true,
            tags: { select: { name: true } },
          },
          orderBy: { date: order },
          take,
          skip: (page - 1) * take,
        },
      },
    })

    return data?.videos
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch videos')
  }
}
