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
      <main className="flex justify-center p-4 md:p-10 md:pt-5">{children}</main>
    </>
  )
}
