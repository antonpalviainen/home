'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { ChannelsNav } from './channels-nav'

function SortNav() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function createPageURL(order: 'asc' | 'desc') {
    const params = new URLSearchParams(searchParams.toString())
    params.set('order', order)
    params.delete('page')

    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="space-x-4">
      <Link href={createPageURL('asc')}>old</Link>
      <Link href={createPageURL('desc')}>new</Link>
    </div>
  )
}

export default function Header({ sortable }: { sortable?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative text-2xl">
      <header className="flex justify-between px-4 py-2 bg-white shadow z-[100]">
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
