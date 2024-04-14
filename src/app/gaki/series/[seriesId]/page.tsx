import { resolveLanguage } from '@/lib/gaki/utils'
import SeriesTable from '@/ui/gaki/series/table'

export default async function Page({
  params,
  searchParams,
}: {
  params: { seriesId: string }
  searchParams?: { lang?: string }
}) {
  const language = resolveLanguage(searchParams?.lang)

  return <SeriesTable seriesId={Number(params.seriesId)} language={language} />
}
