import { Anime, AnimeStatus, AnimeType, Prisma, Season } from '@prisma/client'

export type SortableField =
  | 'status'
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'

 
export type SortDirection = Prisma.SortOrder

export interface SortOptions {
  sort?: SortableField
  direction?: SortDirection
}

export interface FilterOptions {
  status?: AnimeStatus[]
  type?: AnimeType[]
  year?: number[]
  season?: Season[]
  rating?: Anime['rating'][]
  studios?: string[]
}

export type FilterableField = keyof FilterOptions
export type Options = SortOptions & FilterOptions

export type SearchParams = { [K in keyof Options]: string }

export interface GeneratedFilters {
  status?: { in: Options['status'] }
  type?: { in: Options['type'] }
  year?: { in: Options['year'] }
  season?: { in: Options['season'] }
  rating?: { in: number[] } | null
  studios?: { some: { name: { in: Options['studios'] } } }
  OR?: ({ rating: null } | { rating: { in: number[] } })[]
}
