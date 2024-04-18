import { clsx } from 'clsx'

import { fetchFilteredAnime } from '@/lib/anime/data'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'
import { ProgressCell, RatingCell } from '@/ui/anime/cells'
import { TableHead } from '@/ui/anime/table-head'

const filterOptions = {
  status: [
    { label: 'Watching', value: 'watching' },
    { label: 'Completed', value: 'completed' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Dropped', value: 'dropped' },
    { label: 'Plan to Watch', value: 'plan-to-watch' },
  ],
  type: [
    { label: 'TV', value: 'tv' },
    { label: 'OVA', value: 'ova' },
    { label: 'Movie', value: 'movie' },
    { label: 'ONA', value: 'ona' },
  ],
  season: [
    { label: 'Winter', value: 'winter' },
    { label: 'Spring', value: 'spring' },
    { label: 'Summer', value: 'summer' },
    { label: 'Fall', value: 'fall' },
  ],
  rating: [
    { label: '10', value: '10' },
    { label: '9', value: '9' },
    { label: '8', value: '8' },
    { label: '7', value: '7' },
    { label: '6', value: '6' },
    { label: '5', value: '5' },
    { label: '4', value: '4' },
    { label: '3', value: '3' },
    { label: '2', value: '2' },
    { label: '1', value: '1' },
    { label: '-', value: '0' },
  ]
}

export type Anime = Awaited<ReturnType<typeof fetchFilteredAnime>>[0]

export function Cell({
  children,
  className: customClassName,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const className = clsx('px-1.5 py-1', customClassName)

  return <td className={className}>{children}</td>
}

function Row({ anime }: { anime: Anime }) {
  const completed = isCompleted(anime.status)
  const studios = anime.studios.map((studio) => studio.name).join(', ')

  return (
    <tr key={anime.id} className="hover:bg-slate-100">
      <Cell className={getStatusColor(anime.status)}></Cell>
      <Cell>{anime.title}</Cell>
      {completed || !anime.episodes ? (
        <Cell className="text-center">{anime.episodes}</Cell>
      ) : (
        <ProgressCell
          id={anime.id}
          progress={anime.progress}
          episodes={anime.episodes}
        />
      )}
      <Cell className="text-center">{anime.runtime}</Cell>
      <Cell className="text-center">{formatType(anime.type)}</Cell>
      <Cell>{`${anime.year} ${capitalize(anime.season)}`}</Cell>
      <RatingCell id={anime.id} rating={anime.rating} />
      <Cell>{studios}</Cell>
    </tr>
  )
}

export default async function Table({
  order,
  direction,
}: {
  order: string
  direction: string
}) {
  const data = await fetchFilteredAnime(order, direction)

  return (
    <table className="w-full max-w-7xl shadow-2xl shadow-black/50">
      <TableHead filterOptions={filterOptions} />
      <tbody>
        {data.map((anime) => (
          <Row anime={anime} key={anime.id} />
        ))}
      </tbody>
    </table>
  )
}
