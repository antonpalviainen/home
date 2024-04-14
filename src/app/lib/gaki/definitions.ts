import { fetchSeries, fetchSeriesEpisodes } from './data'

export type Language = 'en' | 'ja'

export type Episodes = Awaited<ReturnType<typeof fetchSeriesEpisodes>>

export type Series = Episodes[0]['series'][0]

export type SeriesWithEpisodes = Awaited<ReturnType<typeof fetchSeries>>
