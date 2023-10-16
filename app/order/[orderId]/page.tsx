import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function OrderPage({ params: { orderId } }: { params: { orderId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: order, error: ordersError } = await supabase
    .from('orders')
    .select(
      `*, 
      seller:seller_id(university, campus, grade, academy, gender, notify_email, address, wechat), 
      buyer:buyer_id(university, campus, grade, academy, gender, notify_email, address, wechat), 
      sell:sell_id(*, 
        book:book_id(*))`,
    )
    .eq('id', orderId)
    .single()

  // TODO: Handle order error

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-bold text-center'>Order for {order?.id}</p>

        <div className='grid grid-cols-2 gap-2'>
          <Link
            href={`/books/buy/${
              // @ts-ignore
              order?.sell.book.id
            }`}
            className='text-sm underline hover:text-gray-500'
          >
            Book Name:&nbsp;
            {
              // Supabase type error
              // @ts-ignore
              order?.sell?.book.title
            }
          </Link>

          <p className='text-sm'>Created At: {new Date(order?.created_at!).toLocaleString()}</p>

          <p className='text-sm'>
            Origin Price: ￥
            {
              // @ts-ignore
              order?.sell.book.price
            }
          </p>

          <p className='text-sm'>
            Purchased Price: ￥
            {
              // @ts-ignore
              order?.sell.price
            }
          </p>
        </div>
      </div>
      <p className='text-sm text-center font-bold'>
        {order?.buyer_id == session?.user.id ? 'Seller' : 'Buyer'} Information
      </p>
      <div className='grid grid-cols-2 gap-2'>
        {
          // TODO: Simplify the render
        }
        {
          // If user is buyer
          order?.buyer_id === session?.user.id &&
            // @ts-ignore
            Object.keys(order?.seller).map((info, i) => (
              <p key={i} className='text-sm capitalize'>
                {info}:{' '}
                {
                  // @ts-ignore
                  order?.seller[info]
                }
              </p>
            ))
        }
        {
          // If user is seller
          order?.seller_id === session?.user.id &&
            // @ts-ignore
            Object.keys(order?.buyer).map((info, i) => (
              <p key={i} className='text-sm capitalize'>
                {info}:{' '}
                {
                  // @ts-ignore
                  order?.buyer[info] ?? '未填写'
                }
              </p>
            ))
        }
        {
          // TODO: Seller could cancel the order
          //              modify status to ACCEPTED, so the buyer can not cancel the order easily
          //              modify status to DONE
          //       Buyer could cancel the order, when status is not DONE
          order?.seller_id === session?.user.id && order?.status !== 'CANCELED' && (
            <div className='flex gap-2'>
              Seller Actions:
              {order?.status === 'CREATED' && (
                <>
                  {
                    // TODO: Order status is CREATED, seller could accept or cancel the order
                  }
                </>
              )}
              {order?.status === 'ACCEPTED' && (
                <>
                  {
                    // TODO: Order status is ACCEPTED, seller should give the book to buyer, and set status to DELIVERED
                  }
                </>
              )}
            </div>
          )
        }
        {
          // TODO: Seller could cancel the order
          //              modify status to ACCEPTED, so the buyer can not cancel the order easily
          //              modify status to DONE
          //       Buyer could cancel the order, when status is not DONE
          order?.buyer_id === session?.user.id && order?.status !== 'CANCELED' && (
            <div className='flex gap-2'>
              Buyer Actions:
              {order?.status === 'CREATED' && (
                <>
                  {
                    // TODO: Order status is CREATED, buyer could cancel the order
                  }
                </>
              )}
              {order?.status === 'DELIVERED' && (
                <>
                  {
                    // TODO: Order status is DELIVERED, seller could set status to DONE
                  }
                </>
              )}
            </div>
          )
        }
      </div>
      <Link
        href='/my'
        className='mt-2 shadow-md bg-gradient-to-b from-white to-gray-200 rounded-lg border-2 border-black border-dashed text-center'
      >
        Go back
      </Link>
    </>
  )
}
