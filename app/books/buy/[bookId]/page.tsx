import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import BuyForm from './BuyForm'

export default async function BookSellPage({ params: { bookId } }: { params: { bookId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  // TODO: Handle session error

  const { data: book, error: bookError } = await supabase.from('books').select().eq('id', bookId).single()
  const { data: sells, error: sellError } = await supabase
    .from('sells')
    .select(`*, profiles(*)`)
    // Make sure the book is in sell
    .is('order_id', null)
    .eq('book_id', bookId)
    // Make sure the seller is not the user self
    .not('seller_id', 'eq', session?.user.id!)
    // From low price to high price
    .order('price', { ascending: true })

  // TODO: Handle error

  return (
    <div>
      <div className='flex flex-col sm:flex-row space-x-2 overflow-hidden'>
        <Image
          className='rounded-xl self-center sm:self-auto'
          src={book?.image!}
          height={200}
          width={160}
          alt={`book for ${book?.id}`}
        />
        <div className='flex flex-col'>
          <p className='text-md text-center truncate'>《{book?.title}》</p>
          {book?.subtitle != '' && <p className='text-sm text-center truncate'>- {book?.subtitle}</p>}
          <p className='text-sm text-gray-500 truncate'>Author: &nbsp;&nbsp;&nbsp;{book?.author}</p>
          <p className='text-sm text-gray-500 truncate'>Publisher: {book?.publisher}</p>
          <p className='text-sm text-gray-500 truncate'>Pubdate: &nbsp;&nbsp;{book?.pubdate}</p>
          <p className='text-sm text-gray-500 truncate'>
            Price: &nbsp;&nbsp;&nbsp;&nbsp;<span className='text-black'>{book?.price}</span>元
          </p>
          <p className='text-sm text-gray-500'>Summary: &nbsp;&nbsp;{book?.summary}</p>
        </div>
      </div>
      <div className='flex flex-col mt-2 space-y-2'>
        {sells?.map((sell) => (
          <div
            key={sell.id}
            className='p-2 flex justify-between items-center rounded-lg border-2 border-black border-dashed'
          >
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              <p>University: {sell.profiles?.university ?? '未填写'}</p>
              <p>Campus: {sell.profiles?.campus ?? '未填写'}</p>
              <p>Academy:{sell.profiles?.academy ?? '未填写'}</p>
              <p>Grade:{sell.profiles?.grade ?? '未填写'}</p>
              <p>Gender: {sell.profiles?.gender ?? '保密'}</p>
              <p>Price: {sell.price}元</p>
            </div>
            <BuyForm sellId={sell.id} sellerId={sell.profiles?.id!} />
          </div>
        ))}
      </div>
    </div>
  )
}
