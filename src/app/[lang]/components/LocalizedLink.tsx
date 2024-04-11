import Link from 'next/link'
import { ComponentProps } from 'react'

import type { Locale } from '@/lib/i18n'
import { localizedPathName } from '@/lib/utils'

type NextLink = ComponentProps<typeof Link>
type Props = Omit<NextLink, 'href' | 'locale'> & {
  href: string
  locale: Locale
}
export default function LocalizedLink({ href, locale, ...rest }: Props) {
  return <Link href={localizedPathName(href, locale)} {...rest} />
}
