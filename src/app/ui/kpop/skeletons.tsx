export function VideoSkeleton() {
  return (
    <div>
      <div className="p-2 space-y-2 bg-white rounded-lg shadow animate-pulse">
        <div className="h-5 w-80 bg-neutral-200 rounded-lg"></div>
        <div className="h-5 w-40 bg-neutral-200 rounded-lg"></div>
      </div>
    </div>
  )
}
