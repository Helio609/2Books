import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Database } from './supabase.types'
import { getURL } from './utils'

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE == 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendNotifyMail = async ({
  orderId,
  type,
}: {
  orderId: string
  type: 'CREATED' | 'CANCELED' | 'ACCEPTED' | 'DONE' | 'DELIVERED'
}) => {
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(
      `*, seller:seller_id(notify_email), buyer:buyer_id(notify_email), sell:sell_id(book:book_id(title, subtitle))`,
    )
    .eq('id', orderId)
    .single()

  // @ts-ignore
  const bookName = `${order?.sell.book.title}${order?.sell.book.subtitle ? `- ${order?.sell.book.subtitle}` : ''}`

  if (orderError) {
    // TODO: Handle the order not exist or error fetch error
    return
  }

  // @ts-ignore
  const sellerEmail = order.seller.notify_email

  // @ts-ignore
  const buyerEmail = order.buyer.notify_email

  const sellerMailOptions: Mail.Options = {
    to: sellerEmail ?? '',
    from: '2Books',
    subject: `2Books | ${bookName} | `,
    html: `<a href="${getURL()}/order/${order.id}">点击查看</a>`,
  }

  const buyerMailOptions: Mail.Options = {
    to: buyerEmail ?? '',
    from: '2Books',
    subject: `2Books | ${bookName} | `,
    html: `<a href="${getURL()}/order/${order.id}">点击查看</a>`,
  }

  if (sellerEmail) {
    switch (type) {
      case 'ACCEPTED':
        sellerMailOptions.subject += `订单已接受`
        break
      case 'CANCELED':
        sellerMailOptions.subject += `订单已取消`
        break
      case 'CREATED':
        sellerMailOptions.subject += `订单已创建`
        break
      case 'DELIVERED':
        sellerMailOptions.subject += `订单已配送`
        break
      case 'DONE':
        sellerMailOptions.subject += `订单已完成`
        break
      default:
        break
    }
  }

  if (buyerEmail) {
    switch (type) {
      case 'ACCEPTED':
        buyerMailOptions.subject += `订单已接受`
        break
      case 'CANCELED':
        buyerMailOptions.subject += `订单已取消`
        break
      case 'CREATED':
        buyerMailOptions.subject += `订单已创建`
        break
      case 'DELIVERED':
        buyerMailOptions.subject += `订单已配送`
        break
      default:
        break
    }
  }

  // Speed up! Notice that we use allSettled, for reason of this step will never throw an exception
  await Promise.allSettled([mailer.sendMail(sellerMailOptions), mailer.sendMail(buyerMailOptions)])
}

export { mailer, sendNotifyMail }

