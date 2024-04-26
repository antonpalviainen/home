import * as PrismaTypes from '@prisma/client'

export type Studio = PrismaTypes.AnimeStudio

export type FinishDate = Partial<PrismaTypes.AnimeFinishDate> &
  Pick<PrismaTypes.AnimeFinishDate, 'date'>

export interface Anime extends PrismaTypes.Anime {
  studios: Studio[]
  finishDates: FinishDate[]
}

export type SortableField =
  | 'status'
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'

export type SortDirection = 'asc' | 'desc'

export interface SortOptions {
  sort?: SortableField
  direction?: SortDirection
}

export interface FilterOptions {
  status?: PrismaTypes.AnimeStatus[]
  type?: PrismaTypes.AnimeType[]
  year?: number[]
  season?: PrismaTypes.Season[]
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

export interface HeaderData {
  label: string
  key: SortKey
  width?: string
}

interface FilterOption {
  label: string
  value: string
}

export interface HeaderDataWithFilter extends HeaderData {
  filterOptions: FilterOption[]
}

export type State = {
  errors?: {
    title?: string[]
    episodes?: string[]
    runtime?: string[]
    type?: string[]
    year?: string[]
    season?: string[]
    rating?: string[]
    progress?: string[]
    status?: string[]
    studios?: string[]
    finishDates?: string[]
  }
  message?: string | null
}

export interface Action {
  (prevState: State, formData: FormData): Promise<{
    message?: string
    errors?: Record<string, string[]>
  }>
}
