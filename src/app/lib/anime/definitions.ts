import { Anime, AnimeStatus, AnimeType, Prisma, Season } from '@prisma/client'

// Fields the table can be sorted by
export type SortField =
  | 'status'
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'

// Sorting direction
export type SortDirection = Prisma.SortOrder

export interface Options {
  status?: AnimeStatus[]
  type?: AnimeType[]
  year?: number[]
  season?: Season[]
  rating?: Anime['rating'][]
  studios?: string[]
  sort?: SortField
  direction?: SortDirection
}

export type SearchParams = { [K in keyof Options]: string }

export interface SortOptions {
  sort: Options['sort']
  direction: Options['direction']
}

export type FilterOptions = Omit<Options, 'sort' | 'direction'>

export interface GeneratedFilters {
  status?: { in: Options['status'] }
  type?: { in: Options['type'] }
  year?: { in: Options['year'] }
  season?: { in: Options['season'] }
  rating?: { in: number[] }
  studios?: { some: { name: { in: Options['studios'] } } }
}
