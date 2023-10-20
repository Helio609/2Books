'use client'

import { ArrowPathIcon } from '@heroicons/react/24/solid'

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function UpdateProfileButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='flex justify-center hover:text-gray-500 bg-gradient-to-br from-gray-50 to-gray-300 p-2 rounded-lg border-2 border-black border-dashed'
      disabled={pending}
    >
      {pending ? <ArrowPathIcon className='w-6 h-6 animate-spin' /> : 'Update'}
    </button>
  )
}
