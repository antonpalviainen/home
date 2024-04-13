import { Locale, i18n } from './i18n'

export function localizedPathName(pathname: string, locale: Locale) {
  if (!pathname) return '/'

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
  } else {
    return pathname
  }
}
