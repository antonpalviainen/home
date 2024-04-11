import 'server-only'
import type { Locale } from '@/lib/i18n'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en()
