'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

export async function updateTags(id: string, formData: FormData) {
  const rawTags = formData.get('tags')

  if (typeof rawTags !== 'string') {
    return { error: 'Invalid tags' }
  }

  const tags = rawTags.split(' ').filter(Boolean)

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
    return { error: 'Database error: Failed to update tags' }
  }
}
