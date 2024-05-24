'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (order: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams)
    params.set('order', order)
    params.delete('page')
    return `${pathname}?${params.toString()}`
  }

  return (
    <header className="flex justify-between px-4 py-2">
      <nav className="space-x-4">
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
      </nav>
      <div className="space-x-4">
        <Link href={createPageURL('asc')}>old</Link>
        <Link href={createPageURL('desc')}>new</Link>
      </div>
    </header>
  )
}
