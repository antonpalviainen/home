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
    <main className="h-full min-h-screen flex justify-center p-10 bg-fixed bg-gradient-to-b from-[#2d3655] to-[#5b6686] text-white">
      {children}
    </main>
  )
}
