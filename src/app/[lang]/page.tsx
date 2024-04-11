import Link from 'next/link'

export default async function Page() {
  return (
    <main>
      <h1>gaki route</h1>
      <nav>
        <ul>
          <li>
            <Link href="/gaki-no-tsukai/episodes">episodes</Link>
          </li>
          <li>
            <Link href="/gaki-no-tsukai/series">series</Link>
          </li>
        </ul>
      </nav>
    </main>
  )
}
