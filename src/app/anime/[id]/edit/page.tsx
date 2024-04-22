import { notFound } from 'next/navigation'

import { fetchAnimeById } from '@/lib/anime/data'
import AnimeForm from '@/ui/anime/edit-form'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const anime = await fetchAnimeById(Number(id))

  if (!anime) {
    notFound()
  }

  return <AnimeForm anime={anime} />
}
