'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ChannelsNav } from './channels-nav'

function SortNav() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.delete('page')

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="space-x-4">
      <Link href={pathname + '?' + createQueryString('order', 'asc')}>old</Link>
      <Link href={pathname + '?' + createQueryString('order', 'desc')}>
        new
      </Link>
    </div>
  )
}

export default function Header({ sortable }: { sortable?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative text-2xl">
      <header className="flex justify-between px-4 py-2 bg-white shadow">
        <button onClick={() => setOpen((prev) => !prev)}>channels</button>
        {sortable ? <SortNav /> : null}
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <ChannelsNav />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
