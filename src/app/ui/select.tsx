import { useState, useRef } from 'react'

import useClickOutside from '@/lib/use-click-outside'

export function Select({
  current,
  options,
  handler,
  title,
}: {
  current: number | null
  options: number
  handler: (progress: number) => void
  title?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSelectElement>(null)
  useClickOutside(ref, () => setOpen(false))

  function handleChange() {
    if (ref.current) {
      handler(Number(ref.current.value))
    }
  }

  return (
    <>
      {open ? (
        <select
          ref={ref}
          defaultValue={current ?? 0}
          onChange={handleChange}
          className="text-black"
        >
          {Array.from({ length: options + 1 }, (_, i) => (
            <option key={i} value={i}>
              {i || '-'}
            </option>
          ))}
        </select>
      ) : (
        <button
          onClick={() => setOpen(true)}
          title={title}
          className="hover:text-white/50"
        >
          {current || '-'}
        </button>
      )}
    </>
  )
}
