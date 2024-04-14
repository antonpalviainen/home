import { Language } from '@/lib/gaki/definitions'

export function resolveLanguage(lang?: string | null): Language {
  if (!lang) return 'ja'
  return lang === 'en' ? 'en' : 'ja'
}
