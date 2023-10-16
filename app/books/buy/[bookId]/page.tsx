import Loading from '@/app/loading'
import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { Suspense } from 'react'
import LoadingSellForm from '../../sell/LoadingSellForm'
import SellCard from './SellCard'

export const dynamic = 'force-dynamic'

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
    .select('id')
    // Make sure the book is in sell
    .is('order_id', null)
    .eq('book_id', bookId)
    // Make sure the seller is not the user self
    .not('seller_id', 'eq', session?.user.id!)
    // From low price to high price
    .order('price', { ascending: true })

  // TODO: Handle error

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <div className='flex flex-col sm:flex-row space-x-2 overflow-hidden'>
          <Image
            className='rounded-xl self-center'
            src={book?.image!}
            height={0}
            width={200}
            alt={`book for ${book?.id}`}
          />
          <div className='flex flex-col'>
            <p className='text-md text-center truncate'>《{book?.title}》</p>
            {book?.subtitle && book?.subtitle != '' && <p className='text-sm text-center truncate'>- {book?.subtitle}</p>}
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
            <Suspense key={sell.id} fallback={<LoadingSellForm />}>
              <SellCard key={sell.id} sellId={sell.id} />
            </Suspense>
          ))}
        </div>
      </div>
    </Suspense>
  )
}
