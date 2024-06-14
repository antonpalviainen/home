export function VideoSkeleton() {
  return (
    <div className="p-2 bg-white rounded-lg shadow">
      <div className="space-y-2 animate-pulse">
        <div className="h-5 w-80 bg-neutral-200 rounded-lg md:w-[36rem]"></div>
        <div className="h-5 w-40 bg-neutral-200 rounded-lg md:w-72"></div>
      </div>
    </div>
  )
}
