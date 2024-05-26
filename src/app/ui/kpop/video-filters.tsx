
export function VideoFilters() {
  return (
    <div className="flex justify-center p-4 pt-2 gap-8 lg:justify-end">
      <div>
        <input
          type="checkbox"
          name="hide-watched"
          id="hide-watched"
          className="accent-black" />
        <label htmlFor="hide-watched" className="ml-2">
          hide watched
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          name="hide-shorts"
          id="hide-shorts"
          className="accent-black" />
        <label htmlFor="hide-shorts" className="ml-2">
          hide shorts
        </label>
      </div>
    </div>
  )
}
