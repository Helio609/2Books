import { BookCard, Pagination, SearchBar } from '@/components'
import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BookPage(request: { searchParams: any }) {
  if (!request.searchParams.page || !request.searchParams.count) {
    redirect('/books?page=1&count=10&available=true')
  }

  const page = parseInt(request.searchParams.page)
  const count = parseInt(request.searchParams.count)
  const offset = (page - 1) * count

  const supabase = createServerComponentClient<Database>({ cookies })

  // Handle search condition
  // TODO: Replace with the full text search include subtitle and so forth
  const search = request.searchParams.search ? `%${request.searchParams.search}%` : '%'

  const { data: books, error } = await supabase
    .from('books')
    .select(`id, sells(id)`)
    .like('title', search)
    // TODO: This will cause a problem that only tow type of books will be shown in same query
    .filter('sells', Boolean(request.searchParams.available) ? 'not.is' : 'is', null)
    .range(offset, offset + count - 1)

  if (error) {
    return <p className='text-center'>Error: {error.message}</p>
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row space-x-2 justify-between items-center p-2 rounded-xl border-2 border-black border-dashed'>
        <SearchBar />
        {books.length} Item(s)
      </div>
      {books.length > 0 && (
        <>
          <div className='mt-2 flex flex-1 flex-wrap gap-4'>
            {books?.map((book) => (
              <BookCard key={book.id} bookId={book.id} />
            ))}
          </div>
          <div className='flex m-2 justify-center'>
            <Pagination more={books.length == count} />
          </div>
        </>
      )}
      {books.length === 0 && <>Currently no books in selling!</>}
    </>
  )
}
