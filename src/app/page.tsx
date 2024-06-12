import Link from 'next/link'

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 p-4 text-3xl">
      <Link href="/anime">anime</Link>
      <Link href="/gaki">gaki no tsukai</Link>
      <Link href="/kpop">kpop</Link>
    </main>
  )
}
