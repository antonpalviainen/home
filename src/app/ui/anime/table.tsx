import { AnimeStatus, AnimeType } from '@prisma/client'
import Link from 'next/link'

import { fetchFilteredAnime } from '@/lib/anime/data'

type Anime = Awaited<ReturnType<typeof fetchFilteredAnime>>[0]

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatType(type: AnimeType) {
  switch (type) {
    case AnimeType.tv:
    case AnimeType.ova:
    case AnimeType.ona:
      // tv, ova, and ona have the same format
      return type.toUpperCase()
    case AnimeType.movie:
      return capitalize(type)
    default:
      throw new Error('Invalid type')
  }
}

function getStatusColor(status: AnimeStatus) {
  switch (status) {
    case AnimeStatus.watching:
      return 'bg-[#2db039]'
    case AnimeStatus.rewatching:
    case AnimeStatus.completed:
      // rewatching and completed have the same color
      return 'bg-[#26448f]'
    case AnimeStatus.on_hold:
      return 'bg-[#f1c83e]'
    case AnimeStatus.dropped:
      return 'bg-[#a12f31]'
    case AnimeStatus.plan_to_watch:
      return 'bg-[#c3c3c3]'
    default:
      throw new Error('Invalid status')
  }
}

function Row({ anime }: { anime: Anime }) {
  const statusColor = getStatusColor(anime.status)
  const progress =
    anime.status === AnimeStatus.completed ? '' : (anime.progress ?? '-') + '/'
  const studios = anime.studios.map((studio, i) => [
    i > 0 && ', ',
    <Link key={studio.id} href={`/studio/${studio.id}`}>
      {studio.name}
    </Link>,
  ])

  return (
    <tr key={anime.id} className="border border-black">
      <td className={`p-1 ${statusColor}`}></td>
      <td className="p-1">{anime.title}</td>
      <td className="p-1 text-center">{`${progress}${anime.episodes}`}</td>
      <td className="p-1 text-center">{anime.runtime}</td>
      <td className="p-1 text-center">{formatType(anime.type)}</td>
      <td className="p-1">{`${anime.year} ${capitalize(anime.season)}`}</td>
      <td className="p-1 text-center">{anime.rating}</td>
      <td className="p-1">{studios}</td>
    </tr>
  )
}

export default async function Table() {
  const data = await fetchFilteredAnime()

  return (
    <table className="border border-black">
      <thead>
        <tr className="border border-black">
          <th className="w-3">{}</th>
          <th className="p-1">Title</th>
          <th className="p-1">Progress</th>
          <th className="p-1">Runtime</th>
          <th className="p-1">Type</th>
          <th className="p-1">Premiered</th>
          <th className="p-1">Rating</th>
          <th className="p-1">Studios</th>
        </tr>
      </thead>
      <tbody>
        {data.map((anime) => (
          <Row anime={anime} key={anime.id} />
        ))}
      </tbody>
    </table>
  )
}
