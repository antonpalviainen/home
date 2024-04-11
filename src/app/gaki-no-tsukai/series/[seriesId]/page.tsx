interface Params {
  seriesId: string
}

export default function Page({ params }: { params: Params }) {
  return <p>series route with id: {params.seriesId}</p>
}
