import { ReactNode } from 'react'

import Header from '@/ui/gaki-no-tsukai/header'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-2">{children}</main>
    </>
  )
}
