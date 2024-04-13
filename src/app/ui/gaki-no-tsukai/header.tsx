'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { resolveLanguage } from '@/lib/gaki-no-tsukai/utils'
import LanguageSwitcher from '@/ui/gaki-no-tsukai/language-switcher'

export default function Header() {
  const searchParams = useSearchParams()
  const language = resolveLanguage(searchParams.get('lang'))
  const params = new URLSearchParams()
  params.set('lang', language.toLowerCase())

  return (
    <header className="flex justify-between p-2 border-b border-white">
      <nav className="space-x-2">
        <Link href={`/gaki-no-tsukai?${params.toString()}`}>Home</Link>
        <Link href={`/gaki-no-tsukai/episodes?${params.toString()}`}>
          Episodes
        </Link>
        <Link href={`/gaki-no-tsukai/series?${params.toString()}`}>Series</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  )
}
