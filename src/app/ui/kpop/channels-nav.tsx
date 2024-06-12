import Link from 'next/link'

export function ChannelsNav() {
  return (
    <div className="absolute w-full p-2">
      <nav className="flex flex-col gap-2 px-2 py-2 bg-white border-b border-neutral-200 rounded-lg shadow-xl">
        <Link href="/kpop/all">all</Link>
        <Link href="/kpop/aespa">aespa</Link>
        <Link href="/kpop/chuucandoit">chuucandoit</Link>
        <Link href="/kpop/fromis9">fromis9</Link>
        <Link href="/kpop/itzy">itzy</Link>
        <Link href="/kpop/ive">ive</Link>
        <Link href="/kpop/izone">izone</Link>
        <Link href="/kpop/lesserafim">lesserafim</Link>
        <Link href="/kpop/loona">loona</Link>
        <Link href="/kpop/newjeans">newjeans</Link>
        <Link href="/kpop/nmixx">nmixx</Link>
      </nav>
    </div>
  )
}
