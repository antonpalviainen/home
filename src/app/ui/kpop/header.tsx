'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

function Links() {
  return (
    <>
      <Link href={'/kpop/'}>all</Link>
      <Link href={'/kpop/aespa'}>aespa</Link>
      <Link href={'/kpop/fromis9'}>fromis9</Link>
      <Link href={'/kpop/itzy'}>itzy</Link>
      <Link href={'/kpop/ive'}>ive</Link>
      <Link href={'/kpop/izone'}>izone</Link>
      <Link href={'/kpop/le sserafim'}>lesserafim</Link>
      <Link href={'/kpop/loona'}>loona</Link>
      <Link href={'/kpop/newjeans'}>newjeans</Link>
      <Link href={'/kpop/nmixx'}>nmixx</Link>
    </>
  )
}

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function createPageURL(order: 'asc' | 'desc') {
    const params = new URLSearchParams(searchParams)
    params.set('order', order)
    params.delete('page')
    return `${pathname}?${params.toString()}`
  }

  // Close the menu when clicking outside of it or the button
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        buttonRef.current !== event.target
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  // Close the menu when the viewport is resized to desktop (lg breakpoint)
  useEffect(() => {
    window
      .matchMedia('(min-width: 1024px)')
      .addEventListener('change', () => setOpen(false))
  }, [])

  return (
    <header className="relative text-2xl lg:text-base">
      <div className="flex justify-between px-4 py-2">
        <button
          ref={buttonRef}
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          channels
        </button>
        <nav className="hidden space-x-4 lg:block">
          <Links />
        </nav>
        <nav className="space-x-4">
          <Link href={createPageURL('asc')}>old</Link>
          <Link href={createPageURL('desc')}>new</Link>
        </nav>
      </div>
      {open ? (
        <nav
          ref={ref}
          className="absolute flex flex-col w-full z-10 px-4 py-4 space-y-4 bg-white border-y border-gray-200 shadow-lg"
        >
          <Links />
        </nav>
      ) : null}
    </header>
  )
}
