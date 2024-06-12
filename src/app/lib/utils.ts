export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

// Format an ISO 8601 duration string to [[HH:]MM:]SS
export function formatDuration(duration: string) {
  const m = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i)
  if (!m) return '00:00'

  const hours = m[1] ? `${m[1]}:` : ''
  const minutes = m[1]
    ? `${m[2] ? m[2].padStart(2, '0') : '00'}:`
    : `${m[2] ? `${m[2]}:` : '0:'}`
  const seconds = m[3] ? `${m[3].padStart(2, '0')}` : '00'

  return `${hours}${minutes}${seconds}`
}

export function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
