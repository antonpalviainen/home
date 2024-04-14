'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { resolveLanguage } from '@/lib/gaki/utils'
import LanguageSwitcher from '@/ui/gaki/language-switcher'

export default function Header() {
  const searchParams = useSearchParams()
  const language = resolveLanguage(searchParams.get('lang'))

  return (
    <header className="flex justify-between px-3 py-2 border-b border-black">
      <nav className="space-x-2">
        <Link href={{ pathname: '/gaki', query: { lang: language } }}>
          Home
        </Link>
        <Link href={{ pathname: '/gaki/episodes', query: { lang: language } }}>
          Episodes
        </Link>
        <Link href={{ pathname: '/gaki/series', query: { lang: language } }}>
          Series
        </Link>
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
