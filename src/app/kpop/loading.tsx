function CellSkeleton() {
  return (
    <td className="px-4 py-2">
      <div className="w-20 h-6 bg-black/10 rounded-lg"></div>
    </td>
  )
}

export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex justify-center p-4 pt-2 gap-8 lg:justify-end">
        <div>
          <div className="w-20 h-6 bg-black/10 rounded-lg"></div>
        </div>
        <div>
          <div className="w-20 h-6 bg-black/10 rounded-lg"></div>
        </div>
      </div>
      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <CellSkeleton />
              <CellSkeleton />
              <CellSkeleton />
              <CellSkeleton />
              <CellSkeleton />
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 50 }).map((_, i) => (
              <tr key={i} className="border-t">
                <CellSkeleton />
                <CellSkeleton />
                <CellSkeleton />
                <CellSkeleton />
                <CellSkeleton />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
