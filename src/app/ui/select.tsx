import { useState, useRef } from 'react'

import useClickOutside from '@/lib/use-click-outside'

export function Select({
  current,
  options,
  handler,
}: {
  current: number | null
  options: number
  handler: (progress: number) => void
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
        <select ref={ref} defaultValue={current ?? 0} onChange={handleChange}>
          {Array.from({ length: options + 1 }, (_, i) => (
            <option key={i} value={i}>
              {i || '-'}
            </option>
          ))}
        </select>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="hover:text-blue-600 dark:hover:text-blue-500"
        >
          {current || '-'}
        </button>
      )}
    </>
  )
}
