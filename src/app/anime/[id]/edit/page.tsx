import { notFound } from 'next/navigation'

import { updateAnime } from '@/lib/anime/actions'
import { fetchAnimeById, fetchStudios } from '@/lib/anime/data'
import Form from '@/ui/anime/form'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [anime, studios] = await Promise.all([
    fetchAnimeById(Number(id)),
    fetchStudios(),
  ])

  if (!anime) {
    notFound()
  }

  const updateAnimeWithId = updateAnime.bind(null, Number(id))

  return <Form action={updateAnimeWithId} anime={anime} studios={studios} />
}
