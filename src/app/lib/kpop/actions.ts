'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

export async function updateTags(id: string, tags: string[]) {
  try {
    await prisma.youtubeVideo.update({
      where: { id },
      data: {
        tags: {
          set: [],
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    })

    revalidatePath('/kpop', 'page')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update tags')
  }
}
