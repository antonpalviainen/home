'use server'

import prisma from '@/lib/prisma'

export async function decrementProgress(id: number) {
  try {
    await prisma.anime.update({
      where: { id },
      data: { progress: { decrement: 1 } },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to decrement progress')
  }
}

export async function incrementProgress(id: number) {
  try {
    await prisma.anime.update({
      where: { id },
      data: { progress: { increment: 1 } },
    })
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to increment progress')
  }
}
