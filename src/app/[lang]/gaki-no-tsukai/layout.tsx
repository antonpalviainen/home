import { getDictionary } from '@/lib/dictionaries'
import type { Locale } from '@/lib/i18n'
import Header from '@/components/Header'
import { ReactNode } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: {
  children: ReactNode
  params: { lang: Locale }
}) {
  const d = await getDictionary(lang)

  return (
    <>
      <Header dictionary={d} locale={lang} />
      <main className="p-2">{children}</main>
    </>
  )
}
