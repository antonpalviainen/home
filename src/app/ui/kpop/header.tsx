'use client'

import { useState } from 'react'

import { ChannelsNav } from './channels-nav'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative text-2xl">
      <header className="px-2 py-2 bg-white shadow">
        <button onClick={() => setOpen((prev) => !prev)}>channels</button>
      </header>
      {open ? <ChannelsNav /> : null}
    </div>
  )
}
