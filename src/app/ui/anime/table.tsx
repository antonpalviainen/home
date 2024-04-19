import { clsx } from 'clsx'

import { fetchFilteredAnime } from '@/lib/anime/data'
import { Options, SortDirection, SortField } from '@/lib/anime/definitions'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'
import { ProgressCell, RatingCell } from '@/ui/anime/cells'
import { TableHead } from '@/ui/anime/table-head'

const filterOptions = {
  status: [
    { label: 'Watching', value: 'watching', selected: true },
    { label: 'Completed', value: 'completed', selected: true },
    { label: 'On Hold', value: 'on-hold', selected: true },
    { label: 'Dropped', value: 'dropped', selected: true },
    { label: 'Plan to Watch', value: 'plan-to-watch', selected: true },
  ],
  type: [
    { label: 'TV', value: 'tv', selected: true },
    { label: 'OVA', value: 'ova', selected: true },
    { label: 'Movie', value: 'movie', selected: true },
    { label: 'ONA', value: 'ona', selected: true },
  ],
  season: [
    { label: 'Winter', value: 'winter', selected: true },
    { label: 'Spring', value: 'spring', selected: true },
    { label: 'Summer', value: 'summer', selected: true },
    { label: 'Fall', value: 'fall', selected: true },
  ],
  rating: [
    { label: '10', value: '10', selected: true },
    { label: '9', value: '9', selected: true },
    { label: '8', value: '8', selected: true },
    { label: '7', value: '7', selected: true },
    { label: '6', value: '6', selected: true },
    { label: '5', value: '5', selected: true },
    { label: '4', value: '4', selected: true },
    { label: '3', value: '3', selected: true },
    { label: '2', value: '2', selected: true },
    { label: '1', value: '1', selected: true },
    { label: '-', value: '0', selected: true },
  ],
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

export default async function Table({ options }: { options: Options }) {
  const data = await fetchFilteredAnime(options)

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
