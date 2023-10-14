'use client'

import sellAction from '@/lib/actions/SellAction'
import { ArrowPathIcon, ArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'

// @ts-ignore
import { experimental_useFormState as useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom'

const initialState = {
  error: null,
  done: false,
}

function SellButton({ state }: { state: any }) {
  const { pending } = useFormStatus()

  if (state.done) {
    return <CheckIcon className='w-5 h-5' />
  }

  if (pending) {
    return <ArrowPathIcon className='w-5 h-5 animate-spin' />
  }

  return (
    <button type='submit' className='p-1 rounded-full border-2 border-black border-dashed'>
      <ArrowUpIcon className='w-5 h-5' />
    </button>
  )
}

export default function SellForm() {
  const searchParams = useSearchParams()

  const [state, formAction] = useFormState(sellAction, initialState)

  // Book id never be null
  const bookId = searchParams.get('bookId')!
  return (
    <form action={formAction} className='p-2 flex items-center justify-center space-x-2'>
      Price: <input type='hidden' name='bookId' defaultValue={bookId} />
      <input name='price' type='number' min={0} max={200} step={0.01} required className='w-32 outline-none border-b-2 border-black border-dashed' />
      <SellButton state={state} />
    </form>
  )
}
