'use client'

import { updateOrderStatusAction } from '@/lib/actions/UpdateOrderStatusAction'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import OrderActionButton from './OrderActionButton'

const initialState = {
  error: null,
  done: false,
}

export default function OrderActionForm({
  type,
  orderId,
}: {
  type: 'CANCELED' | 'ACCEPTED' | 'DONE' | 'DELIVERED'
  orderId: string
}) {
  const [state, formAction] = useFormState(updateOrderStatusAction, initialState)

  return (
    <form action={formAction}>
      <input name='type' type='hidden' defaultValue={type} />
      <input name='orderId' type='hidden' defaultValue={orderId} />
      <OrderActionButton state={state} type={type} />
    </form>
  )
}
