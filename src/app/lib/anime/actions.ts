'use server'

import prisma from '@/lib/prisma'

export async function decrementProgress(id: number) {
  try {
    const data = await prisma.anime.update({
      where: { id },
      data: { progress: { decrement: 1 } },
      select: { progress: true },
    })

    return data.progress
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to decrement progress')
  }
}

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
