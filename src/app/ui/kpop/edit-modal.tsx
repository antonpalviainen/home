import { useState } from 'react'

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
      className="px-1 py-px bg-neutral-100 rounded-md text-sm text-neutral-600 hover:bg-neutral-200"
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  )
}

export function EditModal({
  video,
  onClose,
}: {
  video: Video
  onClose: () => void
}) {
  const tagString = video.tags
    ? video.tags.map(({ name }) => name).join(' ')
    : ''
  const [value, setValue] = useState(tagString)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      onClose()
    } catch (error) {
      setError('Database Error: Failed to update tags')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed flex items-center justify-center inset-0 p-2 z-50 bg-black/50">
      <div className="max-w-xl w-full p-4 bg-white rounded-lg shadow-lg">
        <div className="space-y-1">
          <p>{video.title}</p>
          <p className="text-neutral-500 text-sm">
            {formatDate(video.date)} - {video.channel.title}-{' '}
            {formatDuration(video.duration)}
          </p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder='Add tags separated by spaces. Ex: "watched bts"'
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            className="w-full px-2 py-1 border-2 border-neutral-200 rounded-lg placeholder:text-neutral-400"
          />
          <div className="mt-2 space-x-2">
            <span className="text-neutral-500">Toggle tags:</span>
            <Tag name="watched" onClick={addTag} />
            <Tag name="bts" onClick={addTag} />
            <Tag name="vlog" onClick={addTag} />
            <Tag name="short" onClick={addTag} />
          </div>
          {error ? <p className="mt-2 text-red-500">{error}</p> : null}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-3 py-1 border border-red-200 rounded-xl shadow-sm font-medium hover:bg-neutral-100 focus:outline-red-500"
            >
              close
            </button>
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="px-3 py-1 border border-neutral-200 rounded-xl shadow-sm font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
