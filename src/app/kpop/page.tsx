import { Suspense } from 'react'

import Dashboard from '@/ui/kpop/dashboard'
import Header from '@/ui/kpop/header'

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </>
  )
}
