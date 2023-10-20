'use client'

import { ArrowPathIcon } from '@heroicons/react/24/outline';

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function OrderActionButton({ state, type }: { state: any; type: string }) {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <div className='px-2 shadow-md bg-gradient-to-b from-white to-gray-200 rounded-lg border-2 border-black border-dashed'>
        <ArrowPathIcon className='w-6 h-6 animate-spin' />
      </div>
    )
  }

  return (
    <button
      type='submit'
      className='whitespace-nowrap hover:text-gray-500 px-2 shadow-md bg-gradient-to-b from-white to-gray-200 rounded-lg border-2 border-black border-dashed text-center'
    >
      <span className='capitalize'>{type}</span>
    </button>
  )
}
