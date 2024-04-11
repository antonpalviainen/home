'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, type Locale } from '@/lib/i18n'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className="space-x-2">
      {i18n.locales.map((locale) => {
        return (
          <span key={locale}>
            <Link href={redirectedPathName(locale)}>
              {locale.toLocaleUpperCase()}
            </Link>
          </span>
        )
      })}
    </div>
  )
}
