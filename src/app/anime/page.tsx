import { Suspense } from 'react'

import Table from '@/ui/anime/table'

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Table />
    </Suspense>
  )
}
