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
  const minutes = m[2] ? `${m[2]}:` : '0:'
  const seconds = m[3] ? `${m[3].padStart(2, '0')}` : '00'

  return `${hours}${minutes}${seconds}`
}
