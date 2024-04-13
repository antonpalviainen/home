'use client'

import { Language } from '@prisma/client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

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
      {Object.values(Language).map((language) => (
        <Link href={createPageURL(language)} key={language}>
          {language.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
