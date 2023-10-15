import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BookCard({ bookId }: { bookId: string }) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: book, error } = await supabase.from('books').select(`*, sells(id)`).eq('id', bookId).single()

  if (!book || error) {
    return (
      <div className='flex justify-center items-center space-x-2 rounded-xl shadow-md border-2 border-black border-dashed w-[30rem] h-[10rem]'>
        Error: {error.message}
      </div>
    )
  }

  return (
    // TODO: Fixing the layout!!!
    <div className='flex space-x-2 rounded-xl shadow-md border-2 border-black border-dashed w-full max-w-[30rem] h-[10rem]'>
      <Image
        className='rounded-xl border-r-2 border-black border-dashed'
        src={book.image}
        height={144}
        width={122}
        alt={book.title ?? book.subtitle ?? `Book for ${book.isbn10}`}
      />
      <div className='flex flex-col justify-center overflow-hidden flex-1 space-y-2'>
        {book.sells.length == 0 && <p className='text-md text-center truncate'>《{book.title}》</p>}
        {book.sells.length > 0 && (
          <Link
            href={`/books/buy/${book.id}`}
            className='text-md text-center truncate text-blue-500'
            aria-disabled={book.sells.length == 0}
          >
            《{book.title}》
          </Link>
        )}
        {book.subtitle != '' && <p className='text-sm text-center truncate'>{book.subtitle}</p>}
        <p className='text-sm text-gray-500 truncate'>Author: &nbsp;&nbsp;&nbsp;{book.author}</p>
        <p className='text-sm text-gray-500 truncate'>Publisher: {book.publisher}</p>
        <p className='text-sm text-gray-500 truncate'>Pubdate: &nbsp;&nbsp;{book.pubdate}</p>
        <p className='text-sm text-gray-500 truncate'>
          Price: &nbsp;&nbsp;&nbsp;&nbsp;<span className='text-black'>{book.price}</span>元
        </p>
      </div>
    </div>
  )
}
