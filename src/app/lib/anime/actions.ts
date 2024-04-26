'use server'

import 'server-only'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import prisma from '@/lib/prisma'

import type { State } from './definitions'

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
  studios: z.array(z.string()),
  finishDates: z.array(z.coerce.date()),
})

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
    studios: formData.getAll('studios'),
    finishDates: formData.getAll('finishDates'),
  })

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten())
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create anime.',
    }
  }

  const data = validatedFields.data

  try {
    await prisma.anime.create({
      data: {
        title: data.title,
        episodes: data.episodes,
        runtime: data.runtime,
        type: data.type,
        year: data.year,
        season: data.season,
        rating: data.rating,
        progress: data.progress,
        status: data.status,
        studios: {
          connectOrCreate: data.studios.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        finishDates: {
          // create: finishDates.map((date) => ({ date })),
          createMany: { data: data.finishDates.map((date) => ({ date })) },
        },
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to create anime.',
    }
  }

  revalidatePath('/anime')
  redirect('/anime')
}

export async function updateAnime(
  id: number,
  prevState: State,
  formData: FormData
) {
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
    studios: formData.getAll('studios'),
    finishDates: formData.getAll('finishDates'),
  })

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten())
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update anime.',
    }
  }

  const data = validatedFields.data

  try {
    await prisma.anime.update({
      where: { id },
      data: {
        title: data.title,
        episodes: data.episodes,
        runtime: data.runtime,
        type: data.type,
        year: data.year,
        season: data.season,
        rating: data.rating,
        progress: data.progress,
        status: data.status,
        studios: {
          connectOrCreate: data.studios.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        finishDates: {
          // create: finishDates.map((date) => ({ date })),
          createMany: { data: data.finishDates.map((date) => ({ date })) },
        },
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to update anime.',
    }
  }

  revalidatePath('/anime')
  redirect('/anime')
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
