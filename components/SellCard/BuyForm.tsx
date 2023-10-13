'use client'

import buyAction from '@/lib/actions/buyAction'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function BuyButton() {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <button className='animate-spin shadow-md p-2 rounded-full border-2 border-black border-dashed' type='submit'>
        Buying
      </button>
    )
  }

  return (
    <button className='animate-bounce shadow-md p-2 rounded-xl border-2 border-black border-dashed' type='submit'>
      Buy
    </button>
  )
}

export default function BuyForm() {
  const [state, formAction] = useFormState(buyAction, { message: null, done: false })

  return (
    <form action={formAction}>
      <BuyButton />
    </form>
  )
}
