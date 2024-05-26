// 'use client'

// import * as Plot from '@observablehq/plot'
// import { useEffect, useRef } from 'react'

// export default function Titles({
//   data,
// }: {
//   data: {
//     dates: { date: Date; type: 'watch' | 'rewatch' }[]
//     avg: number
//   }
// }) {
//   const ref = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const plot = Plot.plot({
//       x: {
//         grid: true,
//       },
//       y: {
//         grid: true,
//       },
//       color: {
//         legend: true,
//         range: ['#a5a5a5', '#4472c4'],
//       },
//       width: 1000,
//       marks: [
//         // Bar chart
//         Plot.rectY(
//           data.dates,
//           Plot.binX(
//             { y: 'count' },
//             {
//               x: 'date',
//               interval: 'month',
//               fill: 'type',
//             }
//           )
//         ),

//         // Trend line
//         Plot.lineY(
//           data.dates,
//           Plot.windowY(
//             12,
//             Plot.binX(
//               { y: 'count' },
//               {
//                 curve: 'bundle',
//                 interval: 'month',
//                 x: 'date',
//                 stroke: 'white',
//               }
//             )
//           )
//         ),

//         // Average line
//         Plot.ruleY([data.avg], { stroke: 'orange' }),
//       ],
//     })

//     ref.current?.append(plot)

//     return () => plot.remove()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return <div ref={ref} />
// }
