'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../supabase.types'
import { createClient } from '@supabase/supabase-js'

export const updateOrderStatusAction = async (prevState: any, formData: FormData) => {
  const supabaseByCookie = createServerActionClient<Database>({ cookies })
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  const {
    data: { session },
  } = await supabaseByCookie.auth.getSession()

  const type = formData.get('type')?.toString() as 'CANCELED' | 'ACCEPTED' | 'DONE' | 'DELIVERIED'
  const orderId = formData.get('orderId')?.toString()!

  // If action is cancel, set the sell's order_id to null
  if (type === 'CANCELED') {
    const { error } = await supabase
      .from('sells')
      .update({
        order_id: null,
      })
      .eq('order_id', orderId)

    if (error) {
      return { error: error.message, done: false }
    }
  }

  const { error } = await supabaseByCookie
    .from('orders')
    .update({
      status: type,
    })
    .eq('id', orderId)

  if (error) {
    return { error: error.message, done: false }
  }

  // TODO: Sending mail to notify the seller and buyer

  return { done: true }
}
