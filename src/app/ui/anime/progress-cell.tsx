'use client'

import { useRef, useState } from 'react'

import { incrementProgress, updateProgress } from '@/lib/anime/actions'
import { useClickOutside } from '@/lib/useClickOutside'

function ProgressSelect({
  progress,
  episodes,
  handler,
}: {
  progress: number | null
  episodes: number
  handler: (progress: number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSelectElement>(null)
  useClickOutside(ref, async () => setOpen(false))

  function handleChange() {
    if (ref.current) {
      handler(Number(ref.current.value))
    }
  }

  return (
    <>
      {open ? (
        <select ref={ref} defaultValue={progress ?? 0} onChange={handleChange}>
          {Array.from({ length: episodes + 1 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="hover:text-blue-600 dark:hover:text-blue-500"
        >
          {progress ?? '-'}
        </button>
      )}
    </>
  )
}

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
      <ProgressSelect
        progress={progress}
        episodes={episodes}
        handler={handleUpdateProgress}
      />
      {`/${episodes}`}
      <button
        onClick={handleIncrement}
        className="w-5 h-5 ml-1 flex justify-center items-center border rounded-full hover:bg-neutral-100 hover:text-blue-600 dark:hover:text-blue-500"
      >
        +
      </button>
    </td>
  )
}
