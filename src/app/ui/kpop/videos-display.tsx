'use client'

import dynamic from 'next/dynamic'

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
})

import { Videos } from '@/lib/kpop/definitions'

import List from './list'
import Pagination from './pagination'
import Table from './table'

export default function VideosDisplay({
  videos,
  totalPages,
}: {
  videos: Videos
  totalPages: number
}) {
  return (
    <>
      <MediaQuery maxWidth={1024}>
        <List videos={videos} />
      </MediaQuery>
      <MediaQuery minWidth={1025}>
        <Table videos={videos} />
      </MediaQuery>
      <div className="flex mt-4 justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
