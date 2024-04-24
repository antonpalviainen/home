import { notFound } from 'next/navigation'

import { fetchAnimeById, fetchStudios } from '@/lib/anime/data'
import AnimeForm from '@/ui/anime/edit-form'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const [anime, studios] = await Promise.all([
    fetchAnimeById(Number(id)),
    fetchStudios(),
  ])

  if (!anime) {
    notFound()
  }

  return <AnimeForm anime={anime} studios={studios} />
}
