import type { Metadata } from 'next'
import { ReactNode } from 'react'

import Header from '@/ui/gaki/header'

export const metadata: Metadata = {
  title: {
    template: 'Gaki no Tsukai - %s',
    default: 'Gaki no Tsukai',
  },
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-3">{children}</main>
    </>
  )
}
