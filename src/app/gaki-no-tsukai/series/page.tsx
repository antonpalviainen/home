import LocalizedLink from '@/components/LocalizedLink'
import { fetchSeries } from '@/lib/data'
import { Locale } from '@/lib/i18n'

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const series = await fetchSeries(lang)

  return (
    <ul>
      {series.map((s) => (
        <li key={s.id}>
          <LocalizedLink
            href={`/gaki-no-tsukai/series/${s.id}`}
            locale={lang}
            className="flex justify-between"
          >
            <span>{s.names[0].text}</span>
            <span>{s._count.episodes}</span>
          </LocalizedLink>
        </li>
      ))}
    </ul>
  )
}
