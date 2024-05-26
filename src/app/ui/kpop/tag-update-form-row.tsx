import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { updateTags } from '@/lib/kpop/actions'

function Submit() {
  const status = useFormStatus()

  return (
    <button
      type="submit"
      disabled={status.pending}
      className="px-1.5 border rounded-md hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
    >
      Save
    </button>
  )
}

export function TagUpdateFormRow({
  videoId,
  tags,
  onTagsUpdate,
}: {
  videoId: string
  tags: string[]
  onTagsUpdate: () => void
}) {
  const initialState = { success: false, message: '' }
  const updateTagsWithId = updateTags.bind(null, videoId)
  const [state, dispatch] = useFormState(updateTagsWithId, initialState)

  useEffect(() => {
    if (state.success === true) {
      onTagsUpdate()
    }
  }, [state.success, onTagsUpdate])

  return (
    <tr>
      <td colSpan={5} className="px-8 py-2">
        <form action={dispatch} className="flex space-x-2">
          <label htmlFor="tags">Edit tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            defaultValue={tags.join(' ')}
            className="flex-1 px-1 border rounded"
          />
          <Submit />
        </form>
        {state.success === false ? (
          <p className="mt-2 text-red-500">{state?.message}</p>
        ) : null}
      </td>
    </tr>
  )
}
