import { Header } from '@/ui/kpop/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto mb-8 p-2 lg:px-10">{children}</main>
    </>
  )
}
