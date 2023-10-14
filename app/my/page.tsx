import { updateProfileAction } from '@/lib/actions/UpdateProfile'
import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import UpdateProfileButton from './UpdateProfileButton'

export default async function MyPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  const { data: profile, error: profileError } = await supabase.from('profiles').select().eq('id', user?.id!).single()

  // Select the orders that seller_id or buyer_id is equal to user.id(Postgres policy)
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select(`*, seller:seller_id(*), sell:sell_id(*, book:book_id(*))`)
    // CREATED < DONE, asc is true
    .order('status', { ascending: true })

  // TODO: Handle the error

  return (
    <>
      <p className='text-2xl'>Profile</p>
      <form action={updateProfileAction} className='flex flex-col justify-center space-y-2'>
        <div className='grid grid-cols-2 gap-2'>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            University:{' '}
            <input
              name='university'
              defaultValue={profile?.university ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Campus:{' '}
            <input
              name='campus'
              defaultValue={profile?.campus ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Grade:{' '}
            <input
              name='grade'
              defaultValue={profile?.grade ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Academy:{' '}
            <input
              name='academy'
              defaultValue={profile?.academy ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Notify Email:{' '}
            <input
              name='notify_email'
              defaultValue={profile?.notify_email ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Address:{' '}
            <input
              name='address'
              defaultValue={profile?.address ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Wechat:{' '}
            <input
              name='wechat'
              defaultValue={profile?.wechat ?? ''}
              type='text'
              className='outline-none border-b-2 border-black border-dashed'
            />
          </span>
          <span className='p-2 rounded-lg border-2 border-black border-dashed'>
            Gender:{' '}
            <select
              name='gender'
              defaultValue={profile?.gender ?? ''}
              className='outline-none border-b-2 border-black border-dashed'
            >
              <option value=''></option>
              <option value='男'>男</option>
              <option value='女'>女</option>
            </select>
          </span>
        </div>
        <UpdateProfileButton />
      </form>
      <p className='text-2xl'>Orders</p>
      <table>
        <thead className='text-left'>
          <tr>
            <th>Book Title</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.id}>
              <td>
                {
                  // This is a supabase inner error, just ignore it
                  // @ts-ignore
                  order.sell.book.title
                }
              </td>
              <td>
                {
                  // @ts-ignore
                  order.sell.price
                }
              </td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td className={`${order.status === 'CREATED' ? 'text-red-300 font-bold' : 'text-green-300'}`}>
                {order.status}
              </td>
              <td className='text-center'>
                <Link href={`/order/${order.id}`} className='underline hover:text-gray-500'>
                  Look
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
