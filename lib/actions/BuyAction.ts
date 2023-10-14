'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies, headers } from 'next/headers'
import { Database } from '../supabase.types'
import { mailer } from '../mailer'

export default async function buyAction(prevState: any, formData: FormData) {
  // Because some sql needs high permissions like update and delete
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  // Using the client to get the user id
  const supabaseByCookie = createServerComponentClient<Database>({ cookies: cookies })

  const host = headers().get('Host')

  const {
    data: { session },
  } = await supabaseByCookie.auth.getSession()

  const sellId = formData.get('sell_id')?.toString()
  const sellerId = formData.get('seller_id')?.toString()
  const buyerId = session?.user.id

  if (!sellId || !sellerId || !buyerId) {
    return { error: 'One of necessary id is null', done: false }
  }

  // Get the seller's mail
  const { data: seller, error: sellerError } = await supabase.from('profiles').select().eq('id', sellerId).single()
  const sellerEmail = seller?.notify_email

  // TODO: Handle sellerError

  // First thing is create an order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ sell_id: sellId, seller_id: sellerId, buyer_id: buyerId, status: 'CREATED' })
    .select()
    .single()

  if (orderError) {
    return { error: orderError.message, done: false }
  }

  // Update sell 'order_id' column
  const { data: sell, error: sellError } = await supabase
    .from('sells')
    .update({
      order_id: order.id,
    })
    .eq('id', sellId)
    // Make sure that one book only be purchased by one person
    .is('order_id', null)
    .select()
    .maybeSingle()

  if (sellError) {
    // Delete the created order record
    await supabase.from('orders').delete().eq('id', order.id)

    return { error: sellError.message, done: false }
  }

  // TODO: Maybe this line is unused
  if (!sell) {
    return { error: 'Book has been purchased by one user already', done: false }
  }

  // Notify the seller with an email if seller's notify email is not null
  // TODO: Complete the mail send part

  console.log(sellerEmail)
  if (sellerEmail) {
    mailer.sendMail({
      from: process.env.SMTP_USER,
      to: sellerEmail,
      subject: `您的书本被预定了，请前往查看！`,
      html: `
        <a href="http://${host}/order/${order.id}">点击查看</a>
      `
    }).then((e: any) => console.log(e)).catch((e: any) => console.log(e))
  }

  return { done: true }
}
