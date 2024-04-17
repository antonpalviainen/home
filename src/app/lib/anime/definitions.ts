import { Prisma } from '@prisma/client'

export type Order =
  | 'title'
  | 'runtime'
  | 'type'
  | 'premiered'
  | 'rating'
  | 'progress'
  | 'status'

export type Direction = Prisma.SortOrder
