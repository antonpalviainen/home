import { Anime, AnimeStatus, AnimeType, Season } from '@prisma/client'

export type SortableField =
  | 'status'
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'

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

export type SortKey =
  | 'status'
  | 'title'
  | 'progress'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'studios'

export type SortDirection = 'asc' | 'desc'

interface FilterOption {
  label: string
  value: string
}

export interface HeaderData {
  label: string
  key: SortKey
  width?: string
}

export interface HeaderDataWithFilter extends HeaderData {
  filterOptions: FilterOption[]
}
