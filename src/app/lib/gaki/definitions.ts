import { fetchSeriesEpisodes } from './data'

export type Language = 'en' | 'ja'

export type Episodes = Awaited<ReturnType<typeof fetchSeriesEpisodes>>

export type Series = Episodes[0]['series'][0]
