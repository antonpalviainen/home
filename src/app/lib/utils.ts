export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}
