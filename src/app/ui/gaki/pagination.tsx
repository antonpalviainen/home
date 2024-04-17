'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { generatePagination } from '@/lib/gaki/utils'

export default function Pagination({
  totalPages,
  positionOnPage,
}: {
  totalPages: number
  positionOnPage: 'top' | 'bottom'
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          positionOnPage={positionOnPage}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === allPages.length - 1) position = 'last'
            if (allPages.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <PaginationNumber
                key={page === '...' ? `..._${index}` : page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
                positionOnPage={positionOnPage}
              />
            )
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          positionOnPage={positionOnPage}
        />
      </div>
    </>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
  positionOnPage,
}: {
  page: number | string
  href: string
  position?: 'first' | 'last' | 'middle' | 'single'
  isActive: boolean
  positionOnPage: 'top' | 'bottom'
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white dark:bg-blue-900 dark:border-blue-900':
        isActive,
      'hover:bg-neutral-100 dark:hover:bg-white/5':
        !isActive && position !== 'middle',
      'text-slate-300': position === 'middle',
      'dark:border-[#2b3962]': !isActive && positionOnPage === 'top',
      'dark:border-[#2c3c6a]': !isActive && positionOnPage === 'bottom',
    }
  )

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  positionOnPage,
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
  positionOnPage: 'top' | 'bottom'
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-neutral-300 dark:text-slate-500': isDisabled,
      'hover:bg-neutral-100 dark:hover:bg-white/5': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
      'dark:border-[#2b3962]': positionOnPage === 'top',
      'dark:border-[#2c3c6a]': positionOnPage === 'bottom',
    }
  )

  const icon =
    direction === 'left' ? (
      <ChevronLeftIcon className="w-4" />
    ) : (
      <ChevronRightIcon className="w-4" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
