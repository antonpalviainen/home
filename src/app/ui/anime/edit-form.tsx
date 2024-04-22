'use client'

import { Anime } from '@prisma/client'
import Link from 'next/link'
import { useFormState } from 'react-dom'

import { updateAnime } from '@/lib/anime/actions'

export default function AnimeForm({ anime }: { anime: Anime }) {
  const initialState = { message: '', errors: {} }
  const updateAnimeWithId = updateAnime.bind(null, anime.id)
  const [state, dispatch] = useFormState(updateAnimeWithId, initialState)

  return (
    <form action={dispatch}>
      <div className="w-96 px-6 py-4 space-y-4 bg-white/10 rounded-md">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={anime.title}
              aria-describedby="title-error"
              className="w-full px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
            />
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Status and rating */}
        <div className="space-y-2">
          <div className="flex justify-between gap-6">
            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="status">Status</label>
              <div>
                <select
                  name="status"
                  id="status"
                  defaultValue={anime.status}
                  aria-describedby="status-rating-error"
                  className="w-32 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                >
                  <option value="">Watching</option>
                  <option value="">Rewatching</option>
                </select>
              </div>
            </div>
            {/* Rating */}
            <div className="space-y-2">
              <label htmlFor="rating">Rating</label>
              <div>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  defaultValue={anime.rating ?? '-'}
                  aria-describedby="status-rating-error"
                  className="w-20 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
          </div>
          <div id="status-rating-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {state.errors?.rating &&
              state.errors.rating.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Progress, episodes and runtime */}
        <div className="space-y-2">
          <div className="flex justify-between gap-6">
            {/* Progress */}
            <div className="space-y-2">
              <label htmlFor="progress">Progress</label>
              <div>
                {' '}
                <input
                  type="number"
                  name="progress"
                  id="progress"
                  defaultValue={anime.progress ?? 0}
                  aria-describedby="progress-episodes-runtime-error"
                  className="w-20 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
            {/* Episodes */}
            <div className="space-y-2">
              <label htmlFor="episodes">Episodes</label>
              <div>
                <input
                  type="number"
                  name="episodes"
                  id="episodes"
                  defaultValue={anime.episodes ?? 1}
                  aria-describedby="progress-episodes-runtime-error"
                  className="w-20 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
            {/* Runtime */}
            <div className="space-y-2">
              <label htmlFor="runtime">Runtime</label>
              <div>
                <input
                  type="number"
                  name="runtime"
                  id="runtime"
                  defaultValue={anime.runtime ?? 0}
                  aria-describedby="progress-episodes-runtime-error"
                  className="w-20 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
          </div>
          <div
            id="progress-episodes-runtime-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.progress &&
              state.errors.progress.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {state.errors?.episodes &&
              state.errors.episodes.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {state.errors?.runtime &&
              state.errors.runtime.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Type */}
        <div className="space-y-2">
          <label htmlFor="type">Type</label>
          <div>
            <input
              type="text"
              name="type"
              id="type"
              defaultValue={anime.type}
              aria-describedby="type-error"
              className="w-32 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
            />
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type &&
              state.errors.type.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Season and year */}
        <div className="space-y-2">
          <div className="flex justify-between gap-6">
            {/* Season */}
            <div className="space-y-2">
              <label htmlFor="season">Season</label>
              <div>
                {' '}
                <input
                  type="text"
                  name="season"
                  id="season"
                  defaultValue={anime.season}
                  aria-describedby="season-year-error"
                  className="w-32 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
            {/* Year */}
            <div className="space-y-2">
              <label htmlFor="year">Year</label>
              <div>
                <input
                  type="number"
                  name="year"
                  id="year"
                  defaultValue={anime.year}
                  aria-describedby="season-year-error"
                  className="w-20 px-2 py-1 bg-white/10 rounded-md hover:bg-white/15"
                />
              </div>
            </div>
          </div>
          <div id="season-year-error" aria-live="polite" aria-atomic="true">
            {state.errors?.season &&
              state.errors.season.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
            {state.errors?.year &&
              state.errors.year.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-6 mt-4 px-6">
        <button
          type="submit"
          className="w-full px-2 py-1 bg-green-500/65 rounded-md hover:bg-green-500"
        >
          Update
        </button>
        <Link
          href="/anime"
          className="w-full px-2 py-1 text-center bg-red-500/65 rounded-md hover:bg-red-500"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
