import { AnimatePresence, motion } from 'framer-motion'
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
      className="px-1 py-px bg-neutral-100 rounded-lg text-sm transition-colors text-neutral-600 hover:bg-neutral-200"
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  )
}

export default function EditModal({
  video,
  open,
  setOpen,
}: {
  video: Video
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const [value, setValue] = useState(
    video.tags ? video.tags.map(({ name }) => name).join(' ') : ''
  )
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
      setOpen(false)
    } catch (error) {
      setError('Database Error: Failed to update tags')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-center items-center p-2 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="max-w-xl w-full p-4 space-y-4 bg-white rounded-lg shadow-lg"
          >
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
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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
                onClick={() => setOpen(false)}
                className="px-3 py-1 border border-neutral-100 rounded-xl shadow shadow-neutral-200 font-medium transition-colors hover:bg-neutral-100 focus:outline-red-500"
              >
                close
              </button>
              <button
                disabled={submitting}
                onClick={handleSubmit}
                className="px-3 py-1 border border-neutral-100 rounded-xl shadow shadow-neutral-200 font-medium transition-colors hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                save
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
