export default function Tag({ name }: { name: string }) {
  let color

  switch (name) {
    case 'watched':
      color = 'green'
      break
    case 'vlog':
      color = 'blue'
      break
    case 'bts':
      color = 'yellow'
      break
    case 'mv':
      color = 'pink'
      break
    default:
      color = 'neutral'
  }

  return (
    <span className={`px-1 bg-${color}-100 text-${color}-600 text-sm rounded-md`}>
      {name}
    </span>
  )
}
