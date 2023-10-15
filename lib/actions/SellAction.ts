'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../supabase.types'

export default async function sellAction(prevState: any, formData: FormData) {
  const bookId = formData.get('bookId')?.toString()
  const price = formData.get('price')?.toString()

  if (!price || isNaN(parseFloat(price))) {
    return { error: 'Missing price property or price is invaild', done: false }
  }

  if (!bookId) {
    return { error: 'Missing book id property', done: false }
  }

  // Using the client to get the user id
  const supabase = createServerComponentClient<Database>({ cookies: cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Create the sell
  const { data: sell, error: sellError } = await supabase
    .from('sells')
    .insert({
      seller_id: session?.user.id!,
      book_id: bookId,
      price: parseFloat(price),
      // TODO: Change the condition makes visiable of book
      condition: 'NORMAL',
    })
    .select()
    .single()
  
  if (sellError) {
    return { error: sellError.message, done: false }
  }

  return { done: true }
}
