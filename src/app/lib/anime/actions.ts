'use server'

import 'server-only'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import prisma from '@/lib/prisma'

const FormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 character')
    .max(255, 'Title must contain at most 255 characters'),
  episodes: z.coerce
    .number({ invalid_type_error: 'Episodes must be a number or empty' })
    .int()
    .min(1, 'Episodes must be at least 1')
    .nullable(),
  runtime: z.coerce
    .number({ invalid_type_error: 'Runtime must be at least 1' })
    .int()
    .min(1, 'Runtime must be at least 1'),
  type: z.enum(['movie', 'ona', 'ova', 'tv'], {
    errorMap: () => ({ message: 'Invalid value for type' }),
  }),
  year: z.coerce
    .number({ invalid_type_error: 'Year must be at least 1900' })
    .int()
    .min(1900, 'Year must be at least 1900')
    .max(2100, 'Year must be at most 2100'),
  season: z.enum(['winter', 'spring', 'summer', 'fall'], {
    invalid_type_error: 'Please select a season',
  }),
  rating: z.coerce
    .number({ invalid_type_error: 'Invalid value for rating' })
    .int()
    .min(1)
    .max(10)
    .nullable(),
  progress: z.coerce
    .number({ invalid_type_error: 'Progress must be a number or empty' })
    .int()
    .min(1, 'Progress must be at least 1')
    .nullable(),
  status: z.enum(
    [
      'watching',
      'rewatching',
      'completed',
      'on_hold',
      'dropped',
      'plan_to_watch',
    ],
    { errorMap: () => ({ message: 'Invalid value for status' }) }
  ),
  studioIds: z.array(z.coerce.number().int()),
  finishDates: z.array(z.date()),
})
export type State = {
  errors?: {
    title?: string[]
    episodes?: string[]
    runtime?: string[]
    type?: string[]
    year?: string[]
    season?: string[]
    rating?: string[]
    progress?: string[]
    status?: string[]
    studioIds?: string[]
    finishDates?: string[]
  }
  message?: string | null
}

export async function createAnime(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    episodes: formData.get('episodes') || null,
    runtime: formData.get('runtime'),
    type: formData.get('type'),
    year: formData.get('year'),
    season: formData.get('season'),
    rating: formData.get('rating') || null,
    progress: formData.get('progress') || null,
    status: formData.get('status'),
    studioIds: formData.getAll('studioIds'),
    finishDates: formData.getAll('finishDates'),
  })

  if (!validatedFields.success) {
    console.dir(validatedFields.error.flatten())
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create anime.',
    }
  }

  const {
    title,
    episodes,
    runtime,
    type,
    year,
    season,
    rating,
    progress,
    status,
    studioIds,
    finishDates,
  } = validatedFields.data

  // try {
  //   await prisma.anime.create({
  //     data: {
  //       title,
  //       episodes,
  //       runtime,
  //       type,
  //       year,
  //       season,
  //       rating,
  //       progress,
  //       status,
  //       studios: {
  //         c
  //       },
  //       finishDates: {
  //         set: finishDates.map((date) => ({ date })),
  //       },
  //     },
  //   })
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to create anime.',
  //   }
  // }

  console.log(validatedFields.data)

  return {
    message: 'Anime created successfully.',
  }
}

export async function updateAnime(
  id: number,
  prevState: State,
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    episodes: formData.get('episodes'),
    runtime: formData.get('runtime'),
    type: formData.get('type'),
    year: formData.get('year'),
    season: formData.get('season'),
    rating: formData.get('rating'),
    progress: formData.get('progress'),
    status: formData.get('status'),
    studioIds: formData.getAll('studioIds'),
    finishDates: formData.getAll('finishDates'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update anime.',
    }
  }

  const {
    title,
    episodes,
    runtime,
    type,
    year,
    season,
    rating,
    progress,
    status,
    studioIds,
    finishDates,
  } = validatedFields.data

  // try {
  //   await prisma.anime.update({
  //     where: { id },
  //     data: {
  //       title,
  //       episodes,
  //       runtime,
  //       type,
  //       year,
  //       season,
  //       rating,
  //       progress,
  //       status,
  //       studios: {
  //         set: studioIds.map((id) => ({ id })),
  //       },
  //       finishDates: {
  //         set: finishDates.map((date) => ({ date })),
  //       },
  //     },
  //   })
  // } catch (error) {
  //   return {
  //     message: 'Database Error: Failed to update anime.',
  //   }
  // }

  console.log('Anime updated successfully.')

  return {
    message: 'Anime updated successfully.',
  }

  // revalidatePath('/anime')
  // redirect('/anime')
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
