
export function Tag({ name }: { name: string} ) {
  const colors = {
    watched: 'border-green-200 bg-green-50 text-green-600',
    bts: 'border-yellow-200 bg-yellow-50 text-yellow-600',
    vlog: 'border-blue-200 bg-blue-50 text-blue-600',
    mv: 'border-pink-200 bg-pink-50 text-pink-600',
  }

  const color = colors[name as keyof typeof colors] ??
    'border-gray-200 bg-gray-50 text-gray-600'

  return <span className={`px-1 rounded-md border ${color}`}>{name}</span>
}
