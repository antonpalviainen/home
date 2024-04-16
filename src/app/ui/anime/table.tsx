import { clsx } from 'clsx'
import Link from 'next/link'

import { fetchFilteredAnime } from '@/lib/anime/data'
import { getStatusColor, isCompleted } from '@/lib/anime/utils'
import { formatType } from '@/lib/anime/utils'
import { capitalize } from '@/lib/utils'

type Anime = Awaited<ReturnType<typeof fetchFilteredAnime>>[0]

function Cell({
  children,
  className: customClassName,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const className = clsx('px-1.5 py-1', customClassName)

  return <td className={className}>{children}</td>
}

function ProgressCell({ anime }: { anime: Anime }) {
  const completed = isCompleted(anime.status)
  const progress = completed ? '' : (anime.progress ?? '-') + '/'

  return (
    <Cell className="text-center">
      {`${progress}${anime.episodes}`} {!completed && '+'}
    </Cell>
  )
}

function Row({ anime }: { anime: Anime }) {
  const studios = anime.studios.map((studio, i) => [
    i > 0 && ', ',
    <Link key={studio.id} href={`/studio/${studio.id}`}>
      {studio.name}
    </Link>,
  ])

  return (
    <tr key={anime.id} className="border border-black">
      <Cell className={getStatusColor(anime.status)}></Cell>
      <Cell>{anime.title}</Cell>
      <ProgressCell anime={anime} />
      <Cell className="text-center">{anime.runtime}</Cell>
      <Cell className="text-center">{formatType(anime.type)}</Cell>
      <Cell>{`${anime.year} ${capitalize(anime.season)}`}</Cell>
      <Cell className="text-center">{anime.rating}</Cell>
      <Cell>{studios}</Cell>
    </tr>
  )
}

function Header({
  children,
  className: customClassName,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const className = clsx('p-1', customClassName)

  return <th className={className}>{children}</th>
}

export default async function Table() {
  const data = await fetchFilteredAnime()

  return (
    <table className="border border-black">
      <thead>
        <tr className="border border-black">
          <Header className="w-3"></Header>
          <Header>Title</Header>
          <Header>Progress</Header>
          <Header>Runtime</Header>
          <Header>Type</Header>
          <Header>Premiered</Header>
          <Header>Rating</Header>
          <Header>Studios</Header>
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
