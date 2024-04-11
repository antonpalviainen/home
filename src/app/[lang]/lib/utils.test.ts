import { localizedPathName } from './utils'
import { describe, expect, test } from 'vitest'

describe('localizedPathName', () => {
  test('should add locale to pathname if missing', () => {
    const pathname = '/about'
    const locale = 'en'

    const result = localizedPathName(pathname, locale)

    expect(result).toEqual('/en/about')
  })

  test('should not modify pathname if locale is already present', () => {
    const pathname = '/en/about'
    const locale = 'en'

    const result = localizedPathName(pathname, locale)

    expect(result).toEqual(pathname)
  })

  test('should handle pathname without leading slash', () => {
    const pathname = 'about'
    const locale = 'en'

    const result = localizedPathName(pathname, locale)

    expect(result).toEqual('/en/about')
  })

  test('should handle empty pathname', () => {
    const pathname = ''
    const locale = 'en'

    const result = localizedPathName(pathname, locale)

    expect(result).toEqual('/')
  })
})
