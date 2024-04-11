import Link from 'next/link'
import LocaleSwitcher from './LocaleSwitcher'
import { type getDictionary } from '@/lib/dictionaries'
import type { Locale } from '@/lib/i18n'

export default function Header({
  dictionary: d,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  locale: Locale
}) {
  const redirectedPathName = (pathName: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments.splice(1, 0, locale)
    return segments.join('/')
  }

  return (
    <header className="flex justify-between p-2 border-b border-white">
      <nav className="space-x-2">
        <Link href={redirectedPathName('/gaki-no-tsukai')} locale={locale}>
          {d.nav.home}
        </Link>
        <Link
          href={redirectedPathName('/gaki-no-tsukai/episodes')}
          locale={locale}
        >
          {d.nav.episodes}
        </Link>
        <Link
          href={redirectedPathName('/gaki-no-tsukai/series')}
          locale={locale}
        >
          {d.nav.series}
        </Link>
      </nav>
      <LocaleSwitcher />
    </header>
  )
}
