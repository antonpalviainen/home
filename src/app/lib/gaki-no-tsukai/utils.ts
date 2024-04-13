import { Language } from '@/lib/gaki-no-tsukai/definitions'

export function resolveLanguage(lang?: string | null): Language {
  if (!lang) return 'EN'
  return lang.toUpperCase() === 'JA' ? 'JA' : 'EN'
}
