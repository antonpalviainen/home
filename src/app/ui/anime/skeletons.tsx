export function HeaderSkeleton() {
  return (
    <thead className="animate-pulse">
      <tr>
        {/* Status */}
        <th className="w-3 h-8">
          <div className="w-3 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Title */}
        <th className="w-full h-8">
          <div className="w-12 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Progress */}
        <th className="w-[6rem] h-8">
          <div className="w-16 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Runtime */}
        <th className="w-[6rem] h-8">
          <div className="w-16 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Type */}
        <th className="w-[5rem] h-8">
          <div className="w-14 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Premiered */}
        <th className="w-[8rem] h-8">
          <div className="w-24 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Rating */}
        <th className="w-[5rem] h-8">
          <div className="w-14 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
        {/* Studios */}
        <th className="w-[18rem] h-8">
          <div className="w-20 h-6 mx-auto bg-white/20 rounded-md"></div>
        </th>
      </tr>
    </thead>
  )
}

function randomWidth(min: number, max: number) {
  const width = Math.floor(Math.random() * (max - min + 1)) + min
  return { width: `${width}rem` }
}

function TableRowSkeleton() {
  return (
    <tr>
      {/* Status */}
      <td>
        <div className="h-6 bg-white/20 rounded-md"></div>
      </td>
      {/* Title */}
      <td className="px-3 py-1">
        <div
          className="h-6 bg-white/20 rounded-md"
          style={randomWidth(10, 30)}
        ></div>
      </td>
      {/* Progress */}
      <td className="px-3 py-1">
        <div
          className="h-6 mx-auto bg-white/20 rounded-md"
          style={randomWidth(2, 3)}
        ></div>
      </td>
      {/* Runtime */}
      <td className="px-3 py-1">
        <div className="w-8 h-6 mx-auto bg-white/20 rounded-md"></div>
      </td>
      {/* Type */}
      <td className="px-3 py-1">
        <div
          className="h-6 mx-auto bg-white/20 rounded-md"
          style={randomWidth(2, 3)}
        ></div>
      </td>
      {/* Premiered */}
      <td className="px-3 py-1">
        <div
          className="h-6 bg-white/20 rounded-md"
          style={randomWidth(5, 7)}
        ></div>
      </td>
      {/* Rating */}
      <td className="px-3 py-1">
        <div className="w-6 h-6 mx-auto bg-white/20 rounded-md"></div>
      </td>
      {/* Studios */}
      <td className="px-3 py-1">
        <div
          className="h-6 bg-white/20 rounded-md"
          style={randomWidth(5, 10)}
        ></div>
      </td>
    </tr>
  )
}

export function TableSkeleton() {
  return (
    <div className="w-[90rem] px-3 py-2 bg-white/10 rounded-md">
      <table className="w-full table-fixed animate-pulse">
        <HeaderSkeleton />
        <tbody>
          {Array.from({ length: 50 }).map((_, index) => (
            <TableRowSkeleton key={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
