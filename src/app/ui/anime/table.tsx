import { clsx } from 'clsx'
import Link from 'next/link'
import { Suspense } from 'react'

import { fetchFilteredAnime } from '@/lib/anime/data'
import type { Options } from '@/lib/anime/definitions'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'
import { ProgressCell, RatingCell } from '@/ui/anime/cells'
import { HeaderSkeleton } from '@/ui/anime/skeletons'
import TableHead from '@/ui/anime/table-head'

export type Anime = Awaited<ReturnType<typeof fetchFilteredAnime>>[0]

export function Cell({
  children,
  className: customClassName,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const className = clsx('px-3 py-1 whitespace-nowrap', customClassName)

  return <td className={className}>{children}</td>
}

function Row({ anime }: { anime: Anime }) {
  const completed = isCompleted(anime.status)
  const studios = anime.studios.map((studio) => studio.name).join(', ')

  return (
    <tr key={anime.id} className="hover:bg-white/5">
      <td className={`${getStatusColor(anime.status)} w-3`}></td>
      <Cell>
        {anime.title} <Link href={`/anime/${anime.id}/edit`}>Edit</Link>
      </Cell>
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
      <Cell className="rounded-r-md">{studios}</Cell>
    </tr>
  )
}

export default async function Table({ options }: { options: Options }) {
  const rows = await fetchFilteredAnime(options)

  return (
    <div className="w-[90rem] px-3 py-2 bg-white/10 rounded-md">
      <table className="w-full table-fixed">
        <Suspense fallback={<HeaderSkeleton />}>
          <TableHead />
        </Suspense>
        <tbody>
          {rows.map((anime) => (
            <Row anime={anime} key={anime.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
