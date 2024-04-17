'use server'

import 'server-only'

import prisma from '@/lib/prisma'

export async function incrementProgress(id: number) {
  try {
    const data = await prisma.anime.update({
      where: { id },
      data: { progress: { increment: 1 } },
      select: { progress: true },
    })

    return data.progress
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to increment progress')
  }
}

export async function updateProgress(id: number, progress: number) {
  try {
    const data = await prisma.anime.update({
      where: { id },
      data: { progress },
      select: { progress: true },
    })

    return data.progress
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to update progress')
  }
}

export async function updateRating(id: number, rating: number) {
  try {
    const data = await prisma.anime.update({
      where: { id },
      data: { rating },
      select: { rating: true },
    })

    return data.rating
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to update rating')
  }
}
