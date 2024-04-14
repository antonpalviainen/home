'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import LanguageSwitcher from '@/ui/gaki/language-switcher'

export default function Header() {
  const searchParams = useSearchParams()
  const language = searchParams.get('lang')

  const createPageURL = (pathName: string) => {
    if (!language) return pathName

    const params = new URLSearchParams(searchParams)
    params.set('lang', language.toLowerCase())
    return `${pathName}?${params.toString()}`
  }

  return (
    <header className="flex justify-between p-2 border-b border-white">
      <nav className="space-x-2">
        <Link href={createPageURL('/gaki')}>Home</Link>
        <Link href={createPageURL('/gaki/episodes')}>Episodes</Link>
        <Link href={createPageURL('/gaki/series')}>Series</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
