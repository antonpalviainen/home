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

  const tags = []

  for (const tag of rawTags.split(' ')) {
    if (tag.length === 0) continue
    if (tag.length > 10) {
      return {
        success: false,
        message: `Tag '${tag}' is too long. Tags must be 10 characters or shorter.`,
      }
    }
    tags.push(tag)
  }

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
