'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Language } from '@/lib/gaki/definitions'

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (language: Language) => {
    const params = new URLSearchParams(searchParams)
    params.set('lang', language.toLowerCase())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className="space-x-2">
      <Link href={createPageURL('en')} replace>
        EN
      </Link>
      <Link href={createPageURL('ja')} replace>
        JA
      </Link>
    </div>
  )
}
