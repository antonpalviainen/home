'use client'

import { useState } from 'react'

import { HeaderDataWithFilter, HeaderData } from '@/lib/anime/definitions'
import { Header } from '@/ui/anime/header'
import { HeaderWithFilter } from '@/ui/anime/header-with-filter'

export default function TableHead({
  years,
  studios,
}: {
  years: string[]
  studios: string[]
}) {
  const headers: (HeaderData | HeaderDataWithFilter)[] = [
    {
      label: '',
      key: 'status',
      filterOptions: [
        { label: 'Watching', value: 'watching' },
        { label: 'Rewatching', value: 'rewatching' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Dropped', value: 'dropped' },
        { label: 'Plan to Watch', value: 'plan-to-watch' },
      ],
    },
    { label: 'Title', key: 'title' },
    { label: 'Progress', key: 'progress' },
    { label: 'Runtime', key: 'runtime' },
    {
      label: 'Type',
      key: 'type',
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
      filterOptions: years.map((year) => ({
        label: year,
        value: year,
      })),
    },
    {
      label: 'Rating',
      key: 'rating',
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
      filterOptions: studios.map((studio) => ({
        label: studio,
        value: studio,
      })),
    },
  ]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  function handleDeactivate() {
    setActiveIndex(null)
  }

  return (
    <thead>
      <tr>
        {headers.map((header, i) =>
          'filterOptions' in header ? (
            <HeaderWithFilter
              data={header}
              isActive={i === activeIndex}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={handleDeactivate}
              key={header.key}
            />
          ) : (
            <Header
              data={header}
              isActive={i === activeIndex}
              onActivate={() => setActiveIndex(i)}
              onDeactivate={handleDeactivate}
              key={header.key}
            />
          )
        )}
      </tr>
    </thead>
  )
}
