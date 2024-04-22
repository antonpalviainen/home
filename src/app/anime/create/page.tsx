import { fetchStudios } from '@/lib/anime/data'
import Form from '@/ui/anime/create-form'

export default async function Page() {
  const studios = await fetchStudios()

  return <Form studios={studios} />
}
