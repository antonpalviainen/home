import { fetchStudios, fetchYears } from '@/lib/anime/data'
import type { HeaderDataWithFilter, HeaderData } from '@/lib/anime/definitions'

import { Header, HeaderWithFilter } from './headers'

export default async function TableHead() {
  const [studios, years] = await Promise.all([fetchStudios(), fetchYears()])

  const headers: (HeaderData | HeaderDataWithFilter)[] = [
    {
      label: '',
      key: 'status',
      width: 'w-3',
      filterOptions: [
        { label: 'Watching', value: 'watching' },
        { label: 'Rewatching', value: 'rewatching' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Dropped', value: 'dropped' },
        { label: 'Plan to Watch', value: 'plan-to-watch' },
      ],
    },
    { label: 'Title', key: 'title', width: 'w-full' },
    { label: 'Progress', key: 'progress', width: 'w-[5rem]' },
    { label: 'Runtime', key: 'runtime', width: 'w-[5rem]' },
    {
      label: 'Type',
      key: 'type',
      width: 'w-[5rem]',
      filterOptions: [
        { label: 'TV', value: 'tv' },
        { label: 'OVA', value: 'ova' },
        { label: 'Movie', value: 'movie' },
        { label: 'ONA', value: 'ona' },
      ],
    },
    {
      label: 'Premiered',
      key: 'premiered',
      width: 'w-[8rem]',
      filterOptions: years.map((year) => ({
        label: year,
        value: year,
      })),
    },
    {
      label: 'Rating',
      key: 'rating',
      width: 'w-[5rem]',
      filterOptions: [
        { label: '10', value: '10' },
        { label: '9', value: '9' },
        { label: '8', value: '8' },
        { label: '7', value: '7' },
        { label: '6', value: '6' },
        { label: '5', value: '5' },
        { label: '4', value: '4' },
        { label: '3', value: '3' },
        { label: '2', value: '2' },
        { label: '1', value: '1' },
        { label: '-', value: 'null' },
      ],
    },
    {
      label: 'Studios',
      key: 'studios',
      width: 'w-[18rem]',
      filterOptions: studios.map((studio) => ({
        label: studio.name,
        value: studio.name,
      })),
    },
  ]
  return (
    <thead>
      <tr>
        {headers.map((header) =>
          'filterOptions' in header ? (
            <HeaderWithFilter data={header} key={header.key} />
          ) : (
            <Header data={header} key={header.key} />
          )
        )}
      </tr>
    </thead>
  )
}
