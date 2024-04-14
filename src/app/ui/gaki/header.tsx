'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { resolveLanguage } from '@/lib/gaki/utils'
import LanguageSwitcher from '@/ui/gaki/language-switcher'

export default function Header() {
  const searchParams = useSearchParams()
  const language = searchParams.get('lang')
  const query = new URLSearchParams()

  if (language) {
    query.set('lang', resolveLanguage(language))
  }

  return (
    <header className="flex justify-between px-3 py-2 border-b font-medium dark:border-neutral-700">
      <nav className="space-x-2">
        <Link href={{ pathname: '/gaki/episodes', query: query.toString() }}>
          Episodes
        </Link>
        <Link href={{ pathname: '/gaki/series', query: query.toString() }}>
          Series
        </Link>
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
