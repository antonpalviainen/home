import { Header } from '@/ui/kpop/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto my-8 p-2">{children}</main>
    </>
  )
}
