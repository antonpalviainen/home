'use client'

import { useRef, useState } from 'react'
import { useFormState } from 'react-dom'

import useClickOutside from '@/lib/use-click-outside'

interface Subscription {
  id: number
  name: string
  amount: number
  billing: 'monthly' | 'annual'
}

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: 'Patreon',
    amount: 124,
    billing: 'monthly',
  },
  {
    id: 2,
    name: 'GitHub Copilot',
    amount: 1000,
    billing: 'monthly',
  },
  {
    id: 3,
    name: 'Mega',
    amount: 999,
    billing: 'monthly',
  },
  {
    id: 4,
    name: 'Google Drive',
    amount: 2999,
    billing: 'annual',
  },
  {
    id: 5,
    name: 'Adobe Creative Cloud',
    amount: 2790,
    billing: 'monthly',
  },
  {
    id: 6,
    name: 'Proton VPN',
    amount: 999,
    billing: 'monthly',
  },
  {
    id: 7,
    name: 'iCloud',
    amount: 99,
    billing: 'monthly',
  },
  {
    id: 8,
    name: 'YouTube Premium',
    amount: 1199,
    billing: 'monthly',
  },
  {
    id: 9,
    name: 'Duolingo',
    amount: 999,
    billing: 'monthly',
  },
]

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
})

type State = {
  errors?: {
    name?: string[]
    amount?: string[]
    billing?: string[]
  }
  message?: string | null
}

function testCreate(prevState: State, formData: FormData) {
  console.log('testSave', formData)

  return { message: 'Saved' }
}

function testUpdate(id: number, prevState: State, formData: FormData) {
  console.log('testUpdate', formData)

  return { message: 'Saved' }
}

function Modal({
  isOpen,
  setIsOpen,
  defaultValues,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  defaultValues?: Subscription
}) {
  const ref = useRef(null)
  useClickOutside(ref, () => setIsOpen(false))

  const initialState = { message: '', errors: {} }

  const action = defaultValues
    ? testUpdate.bind(null, defaultValues.id)
    : testCreate
  const [state, dispatch] = useFormState(action, initialState)

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm">
      <form action={dispatch} ref={ref} className="p-6 bg-white rounded-lg">
        <div className="space-y-2">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full my-2 px-1 py-0.5 border border-gray-200 rounded-md"
              defaultValue={defaultValues?.name}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              className="w-full my-2 px-1 py-0.5 border border-gray-200 rounded-md"
              defaultValue={defaultValues?.amount ?? 0 / 100}
            />
          </div>
          <div>
            <label htmlFor="billing">Billing</label>
            <select
              id="billing"
              className="w-full my-2 py-0.5 border border-gray-200 rounded-md"
              defaultValue={defaultValues?.billing ?? 'monthly'}
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full mt-4 text-center px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 text-center px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:bg-red-700"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

function Subscription({ name, amount, billing }: Subscription) {
  return (
    <button className="w-full flex flex-col items-center p-2 rounded-lg bg-gray-200">
      <div>{name}</div>
      <div className="flex items-center">
        <span>{formatter.format(amount / 100)}</span>
        <span className="ml-0.5 text-sm text-gray-600">
          /{billing === 'annual' ? 'year' : 'month'}
        </span>
      </div>
    </button>
  )
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col justify-between gap-3 p-4">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex flex-col items-center p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
      >
        Add
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="h-full space-y-3 overflow-y-auto">
        {subscriptions.map((subscription) => (
          <Subscription key={subscription.id} {...subscription} />
        ))}
      </div>
      <div className="w-full flex flex-col items-center p-2 rounded-lg bg-gray-600 text-gray-100">
        <div>Total</div>
        <div className="flex items-center">
          <span>
            {formatter.format(
              subscriptions.reduce(
                (sum, { amount, billing }) =>
                  sum + (billing === 'monthly' ? amount : amount / 12),
                0
              ) / 100
            )}
          </span>
          <span className="ml-0.5 text-sm text-gray-300">/month</span>
        </div>
      </div>
    </div>
  )
}
