'use client'

import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import {
  incrementProgress,
  updateProgress,
  updateRating,
} from '@/lib/anime/actions'
import { Select } from '@/ui/select'

export function ProgressCell({
  id,
  progress: initProgress,
  episodes,
}: {
  id: number
  progress: number | null
  episodes: number
}) {
  const [progress, setProgress] = useState(initProgress)

  async function handleIncrement() {
    if ((progress ?? 0) === episodes) return

    const newProgress = await incrementProgress(id)
    setProgress(newProgress)
  }

  async function handleUpdateProgress(value: number) {
    if (value === progress || value < 0 || value > episodes) return

    const newProgress = await updateProgress(id, value)
    setProgress(newProgress)
  }

  return (
    <td className="flex justify-center items-center px-1.5 py-1">
      <Select
        current={progress}
        options={episodes}
        handler={handleUpdateProgress}
      />
      {`/${episodes}`}
      <button
        onClick={handleIncrement}
        className="flex justify-center items-center text-gray-500 hover:text-blue-600 dark:hover:text-gray-700"
      >
        <PlusCircleIcon className="w-4 ml-0.5 pt-0.5" />
      </button>
    </td>
  )
}

export function RatingCell({
  id,
  rating: initRating,
}: {
  id: number
  rating: number | null
}) {
  const [rating, setRating] = useState(initRating)

  async function handleUpdateRating(value: number) {
    if (value === rating || value < 0 || value > 10) return

    const newRating = await updateRating(id, value)
    setRating(newRating)
  }

  return (
    <td className="flex justify-center items-center px-1.5 py-1">
      <Select current={rating} options={10} handler={handleUpdateRating} />
    </td>
  )
}
