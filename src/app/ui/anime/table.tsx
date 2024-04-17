import { clsx } from 'clsx'

import { fetchFilteredAnime } from '@/lib/anime/data'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'
import { ProgressCell, RatingCell } from '@/ui/anime/cells'
import { TableHead } from '@/ui/anime/table-head'

const filterOptions = {
  status: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  type: ['TV', 'OVA', 'Movie', 'ONA'],
  season: ['Winter', 'Spring', 'Summer', 'Fall'],
  rating: ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
    <table className="w-full max-w-7xl shadow-2xl shadow-neutral-500">
      <TableHead filterOptions={filterOptions} />
      <tbody>
        {data.map((anime) => (
          <Row anime={anime} key={anime.id} />
        ))}
      </tbody>
    </table>
  )
}
