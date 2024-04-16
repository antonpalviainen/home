'use client'

import { useState } from 'react'

import { decrementProgress, incrementProgress } from '@/lib/anime/actions'

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

  async function handleDecrement() {
    if ((progress ?? 0) === 0) return

    const newProgress = await decrementProgress(id)
    setProgress(newProgress)
  }

  async function handleIncrement() {
    if ((progress ?? 0) === episodes) return

    const newProgress = await incrementProgress(id)
    setProgress(newProgress)
  }

  return (
    <td className="flex justify-center items-center px-1.5 py-1">
      <button
        onClick={handleDecrement}
        className="w-5 h-5 mr-1 flex justify-center items-center border rounded-full hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-500"
      >
        -
      </button>
      {`${progress ?? '-'}/${episodes}`}
      <button
        onClick={handleIncrement}
        className="w-5 h-5 ml-1 flex justify-center items-center border rounded-full hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-500"
      >
        +
      </button>
    </td>
  )
}
