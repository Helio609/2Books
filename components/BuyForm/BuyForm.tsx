'use client'

import buyAction from '@/lib/actions/BuyAction'
import { ShoppingCartIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const initialState = {
  error: null,
  done: false,
}

function BuyButton({ state }: { state: typeof initialState }) {
  const { pending } = useFormStatus()

  if (state.done) {
    return <CheckIcon className='w-6 h-6' />
  }

  if (pending) {
    return <ArrowPathIcon className='w-6 h-6 animate-spin' />
  }

  return (
    <button type='submit'>
      <ShoppingCartIcon className='w-6 h-6' />
    </button>
  )
}

export default function BuyForm({ sellId, sellerId }: { sellId: string; sellerId: string }) {
  const [state, formAction] = useFormState(buyAction, initialState)

  return (
    <form action={formAction}>
      <input hidden type='hidden' name='sell_id' defaultValue={sellId} />
      <input hidden type='hidden' name='seller_id' defaultValue={sellerId} />
      <BuyButton state={state} />
    </form>
  )
}
