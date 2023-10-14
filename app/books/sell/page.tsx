import { BookCard } from '@/components'
import { searchBookByIsbnAction } from '@/lib/actions/SearchBookByIsbnAction'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import SellForm from './SellForm'

export default function SellPage(request: { searchParams: { isbn?: string; bookId?: string; error?: string } }) {
  const error = request.searchParams.error
  const isbn = request.searchParams.isbn
  const bookId = request.searchParams.bookId

  const supabase = createServerComponentClient({ cookies })

  return (
    <>
      <p className='font-bold text-center'>Sell Book</p>
      <form
        action={searchBookByIsbnAction}
        className='p-2 flex items-center justify-center space-x-2 rounded-lg border-2 border-black border-dashed'
      >
        ISBN:{' '}
        <input
          name='isbn'
          defaultValue={isbn ?? ''}
          type='text'
          required
          className='w-32 outline-none border-b-2 border-black border-dashed'
        />
        <button type='submit' className='p-1 rounded-full border-2 border-black border-dashed'>
          <MagnifyingGlassIcon className='w-5 h-5' />
        </button>
      </form>
      {error && <p className='text-center'>{error}</p>}
      {bookId && (
        <div className='mt-2 flex flex-col justify-center mx-auto'>
          <BookCard bookId={bookId} />
          <SellForm />
        </div>
      )}
    </>
  )
}
