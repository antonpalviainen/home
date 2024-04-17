import 'server-only'

import { Language as GeneratedLanguage } from '@prisma/client'

import { fetchSeries, fetchSeriesEpisodes } from './data'

export type Language = GeneratedLanguage

export type Episodes = Awaited<ReturnType<typeof fetchSeriesEpisodes>>

export type Series = Episodes[0]['series'][0]

export type SeriesWithEpisodes = Awaited<ReturnType<typeof fetchSeries>>
