import { useEffect, useRef, useState } from 'react'

import { updateTags } from '@/lib/kpop/actions'
import type { Video } from '@/lib/kpop/definitions'
import { formatDate, formatDuration } from '@/lib/utils'

function Tag({
  name,
  onClick,
}: {
  name: string
  onClick: (tag: string) => void
}) {
  return (
    <button
      className="px-1 py-px bg-neutral-100 rounded-lg text-sm text-neutral-600 hover:bg-neutral-200"
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  )
}

export default function EditModal({ video }: { video: Video }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(
    video.tags ? video.tags.map(({ name }) => name).join(' ') : ''
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  function addTag(tag: string) {
    setValue((prev) => {
      if (prev.includes(tag)) {
        return prev.replace(new RegExp(`${tag}\\s*`), '').trim()
      }
      return `${prev} ${tag}`.trim()
    })
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)
    const tags = []

    for (const tag of value.split(' ')) {
      if (tag.length === 0) continue
      if (tag.length > 10) {
        setError(
          `Tag '${tag}' is too long. Tags must be 10 characters or shorter.`
        )
        return
      }
      tags.push(tag)
    }

    try {
      await updateTags(video.id, tags)
      setOpen(false)
    } catch (error) {
      setError('Database Error: Failed to update tags')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-1 py-px bg-neutral-100 rounded-lg text-sm text-neutral-600 hover:bg-neutral-200"
      >
        edit
      </button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        className="max-w-lg w-full p-2 bg-transparent backdrop:bg-black/50"
      >
        <div className="p-4 space-y-4 bg-white rounded-lg shadow-lg ">
          <div className="space-y-1">
            <p>{video.title}</p>
            <p className="text-neutral-500 text-sm">
              {formatDate(video.date)} - {video.channel.title}-{' '}
              {formatDuration(video.duration)}
            </p>
          </div>
          <div className="space-y-2">
            <input
              autoFocus
              type="text"
              value={value}
              placeholder='Add tags separated by spaces. Ex: "watched bts"'
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-2 py-1 border-2 border-neutral-200 rounded-lg placeholder:text-neutral-400"
            />
            <div className="space-x-2">
              <span className="text-neutral-500">Toggle tags:</span>
              <Tag name="watched" onClick={addTag} />
              <Tag name="bts" onClick={addTag} />
              <Tag name="vlog" onClick={addTag} />
              <Tag name="short" onClick={addTag} />
            </div>
          </div>
          {error ? <p className="text-red-500">{error}</p> : null}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => ref?.current?.close()}
              className="px-3 py-1 rounded-xl shadow shadow-neutral-200 font-medium hover:bg-neutral-100 focus:outline-red-500"
            >
              close
            </button>
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="px-3 py-1 rounded-xl shadow shadow-neutral-200 font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              save
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
