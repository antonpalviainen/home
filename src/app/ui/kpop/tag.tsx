export default function Tag({ name }: { name: string }) {
  let colors

  switch (name) {
    case 'watched':
      colors = 'bg-green-500'
      break
    case 'vlog':
      colors = 'bg-blue-500'
      break
    case 'bts':
      colors = 'bg-yellow-500'
      break
    case 'mv':
      colors = 'bg-pink-500'
      break
    default:
      colors = 'bg-neutral-500'
  }

  return (
    <span
      className={`inline-flex items-center h-5 pl-1 rounded-l-md rounded-r-xl ${colors}`}
    >
      <span className="px-1 bg-neutral-100 text-sm text-neutral-500 rounded-r-md">
        {name}
      </span>
    </span>
  )
}
