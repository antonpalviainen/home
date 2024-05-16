'use client'

import * as Plot from '@observablehq/plot'
import { useEffect, useRef } from 'react'

interface RatingData {
  rating: string
  count: number
}

export default function RatingDistribution({ data }: { data: RatingData[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const plot = Plot.plot({
      title: 'Rating distribution',
      x: {
        grid: true,
      },
      y: {
        type: 'band',
        domain: data.map((d) => d.rating),
        padding: 0.3,
      },
      marks: [Plot.barX(data, { x: 'count', y: 'rating' }), Plot.frame()],
    })

    ref.current?.append(plot)

    return () => plot.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={ref} />
}
