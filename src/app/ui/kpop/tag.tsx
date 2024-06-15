export default function Tag({ name }: { name: string }) {
  let colors

  switch (name) {
    case 'watched':
      colors = 'bg-green-100 text-green-600'
      break
    case 'vlog':
      colors = 'bg-blue-100 text-blue-600'
      break
    case 'bts':
      colors = 'bg-yellow-100 text-yellow-600'
      break
    case 'mv':
      colors = 'bg-pink-100 text-pink-600'
      break
    default:
      colors = 'bg-neutral-100 text-neutral-600'
  }

  return <span className={`px-1 ${colors} text-sm rounded-lg`}>{name}</span>
}
