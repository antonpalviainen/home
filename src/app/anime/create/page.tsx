import { createAnime } from '@/lib/anime/actions'
import { fetchStudios } from '@/lib/anime/data'
import Form from '@/ui/anime/form'

export default async function Page() {
  const studios = await fetchStudios()

  return <Form action={createAnime} studios={studios} />
}
