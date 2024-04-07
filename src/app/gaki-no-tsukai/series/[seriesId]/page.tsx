export default function Page({ params }: { params: { seriesId: string } }) {
  return <p>series route with id: {params.seriesId}</p>
}
