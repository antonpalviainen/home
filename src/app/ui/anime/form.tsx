'use client'

import { clsx } from 'clsx'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'

import type { Action, Anime, Studio } from '@/lib/anime/definitions'

import { FinishDates } from './finish-date-select'
import { StudioSelect } from './studio-select'

export default function Form({
  action,
  studios,
  anime,
}: {
  action: Action
  studios: Studio[]
  anime?: Anime
}) {
  const initialState = { message: '', errors: {} }
  const [state, dispatch] = useFormState(action, initialState)

  const commonStyles =
    'px-2 py-1 bg-white/10 rounded-md border-2 hover:bg-white/15'
  const classNames = {
    number: (errors?: string[]) =>
      clsx(
        commonStyles,
        'w-20',
        errors ? 'border-red-500/100' : 'border-transparent'
      ),
    select: (errors?: string[]) =>
      clsx(
        commonStyles,
        'w-36',
        errors ? 'border-red-500/100' : 'border-transparent'
      ),
    title: (errors?: string[]) =>
      clsx(
        commonStyles,
        'w-full',
        errors ? 'border-red-500/100' : 'border-transparent'
      ),
  }

  return (
    <form action={dispatch}>
      <div className="w-[30rem] px-6 py-4 space-y-4 bg-white/10 rounded-md">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="title">Title*</label>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              aria-describedby="title-error"
              className={classNames.title(state.errors?.title)}
              defaultValue={anime?.title}
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
                  aria-describedby="status-rating-error"
                  className={classNames.select(state.errors?.status)}
                  defaultValue={anime?.status}
                >
                  <option value="watching" className="bg-[#5c637c]">
                    Watching
                  </option>
                  <option value="watching" className="bg-[#5c637c]">
                    Rewatching
                  </option>
                  <option value="completed" className="bg-[#5c637c]">
                    Completed
                  </option>
                  <option value="on_hold" className="bg-[#5c637c]">
                    On hold
                  </option>
                  <option value="dropped" className="bg-[#5c637c]">
                    Dropped
                  </option>
                  <option value="plan_to_watch" className="bg-[#5c637c]">
                    Plan to watch
                  </option>
                </select>
              </div>
            </div>
            {/* Rating */}
            <div className="space-y-2">
              <label htmlFor="rating">Rating</label>
              <div>
                <select
                  name="rating"
                  id="rating"
                  aria-describedby="status-rating-error"
                  defaultValue={anime?.rating ?? ''}
                  className={classNames.select(state.errors?.rating)}
                >
                  <option value="10" className="bg-[#5c637c]">
                    10
                  </option>
                  <option value="9" className="bg-[#5c637c]">
                    9
                  </option>
                  <option value="8" className="bg-[#5c637c]">
                    8
                  </option>
                  <option value="7" className="bg-[#5c637c]">
                    7
                  </option>
                  <option value="6" className="bg-[#5c637c]">
                    6
                  </option>
                  <option value="5" className="bg-[#5c637c]">
                    5
                  </option>
                  <option value="4" className="bg-[#5c637c]">
                    4
                  </option>
                  <option value="3" className="bg-[#5c637c]">
                    3
                  </option>
                  <option value="2" className="bg-[#5c637c]">
                    2
                  </option>
                  <option value="1" className="bg-[#5c637c]">
                    1
                  </option>
                  <option value="" className="bg-[#5c637c]">
                    -
                  </option>
                </select>
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
                <input
                  type="number"
                  name="progress"
                  id="progress"
                  aria-describedby="progress-episodes-runtime-error"
                  className={classNames.number(state.errors?.progress)}
                  min={1}
                  defaultValue={anime?.progress ?? undefined}
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
                  aria-describedby="progress-episodes-runtime-error"
                  className={classNames.number(state.errors?.episodes)}
                  min={1}
                  defaultValue={anime?.episodes ?? undefined}
                />
              </div>
            </div>
            {/* Runtime */}
            <div className="space-y-2">
              <label htmlFor="runtime">Runtime*</label>
              <div>
                <input
                  type="number"
                  name="runtime"
                  id="runtime"
                  aria-describedby="progress-episodes-runtime-error"
                  className={classNames.number(state.errors?.runtime)}
                  min={1}
                  defaultValue={anime?.runtime ?? undefined}
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
            <select
              name="type"
              id="type"
              aria-describedby="type-error"
              className={classNames.select(state.errors?.type)}
              defaultValue={anime?.type}
            >
              <option value="tv" className="bg-[#5c637c]">
                TV
              </option>
              <option value="movie" className="bg-[#5c637c]">
                Movie
              </option>
              <option value="ova" className="bg-[#5c637c]">
                OVA
              </option>
              <option value="ona" className="bg-[#5c637c]">
                ONA
              </option>
            </select>
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
                <select
                  name="season"
                  id="season"
                  aria-describedby="season-year-error"
                  className={classNames.select(state.errors?.season)}
                  defaultValue={anime?.season}
                >
                  <option value="winter" className="bg-[#5c637c]">
                    Winter
                  </option>
                  <option value="spring" className="bg-[#5c637c]">
                    Spring
                  </option>
                  <option value="summer" className="bg-[#5c637c]">
                    Summer
                  </option>
                  <option value="fall" className="bg-[#5c637c]">
                    Fall
                  </option>
                </select>
              </div>
            </div>
            {/* Year */}
            <div className="space-y-2">
              <label htmlFor="year">Year*</label>
              <div>
                <input
                  type="number"
                  name="year"
                  id="year"
                  aria-describedby="season-year-error"
                  className={classNames.number(state.errors?.year)}
                  min={1900}
                  max={2100}
                  defaultValue={anime?.year}
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
        {/* Finish dates */}
        <FinishDates defaultValues={anime?.finishDates.map((d) => d.date)} />
        {/* Studios */}
        <div className="space-y-2">
          <label htmlFor="type">Studios</label>
          <StudioSelect studios={studios} defaultValues={anime?.studios} />
          <div id="studios-error" aria-live="polite" aria-atomic="true">
            {state.errors?.studios &&
              state.errors.studios.map((error) => (
                <p className="text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div>
          {state.message && <p className="text-red-500">{state.message}</p>}
        </div>
      </div>
      <div className="flex justify-between gap-6 mt-4 px-6">
        <button
          type="submit"
          className="w-full px-2 py-1 bg-green-500/65 rounded-md hover:bg-green-500"
        >
          Save
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
