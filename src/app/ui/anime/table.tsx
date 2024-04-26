import { PencilSquareIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Suspense } from 'react'

import { fetchFilteredAnime } from '@/lib/anime/data'
import type { Anime, Options } from '@/lib/anime/definitions'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'

import { ProgressCell, RatingCell } from './cells'
import { HeaderSkeleton } from './skeletons'
import TableHead from './table-head'

function Row({ anime }: { anime: Anime }) {
  const completed = isCompleted(anime.status)
  const studios = anime.studios.map((studio) => studio.name).join(', ')

  return (
    <tr key={anime.id} className="group hover:bg-white/5">
      <td className={`${getStatusColor(anime.status)} w-3`}></td>
      <td>
        <div className="flex justify-between px-3 py-1 whitespace-nowrap">
          {anime.title}
          <Link href={`/anime/${anime.id}/edit`} title="Edit">
            <PencilSquareIcon className="w-5 text-white/90 invisible group-hover:visible hover:text-white/50" />
          </Link>
        </div>
      </td>
      {completed || !anime.episodes ? (
        <td className="px-3 py-1 whitespace-nowrap text-center">
          {anime.episodes}
        </td>
      ) : (
        <ProgressCell
          id={anime.id}
          progress={anime.progress}
          episodes={anime.episodes}
        />
      )}
      <td className="px-3 py-1 whitespace-nowrap text-center">
        {anime.runtime}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-center">
        {formatType(anime.type)}
      </td>
      <td>{`${anime.year} ${capitalize(anime.season)}`}</td>
      <RatingCell id={anime.id} rating={anime.rating} />
      <td className="px-3 py-1 whitespace-nowrap rounded-r-md">{studios}</td>
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
