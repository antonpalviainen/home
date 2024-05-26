'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

export async function updateTags(
  id: string,
  prevState: { success: boolean; message?: string },
  formData: FormData
) {
  const rawTags = formData.get('tags')
  
  if (typeof rawTags !== 'string') {
    return { success: false, message: 'Invalid tags' }
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
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Database error: Failed to update tags' }
  }
}
