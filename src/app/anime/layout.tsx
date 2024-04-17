import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    template: 'Anime - %s',
    default: 'Anime',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    // dark:bg-gradient-to-b dark:from-[#0e1734] dark:to-[#172d69] dark:text-white
    <main className="h-full min-h-screen flex justify-center p-10 bg-fixed ">
      {children}
    </main>
  )
}
