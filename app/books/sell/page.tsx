import { BookCard } from '@/components'
import SearchIsbnForm from './SearchIsbnForm'
import SellForm from './SellForm'

export const dynamic = 'force-dynamic'

export default function SellPage(request: { searchParams: { isbn?: string; bookId?: string; error?: string } }) {
  const error = request.searchParams.error
  const isbn = request.searchParams.isbn
  const bookId = request.searchParams.bookId

  return (
    <>
      <p className='font-bold text-center'>Sell Book</p>
      <SearchIsbnForm defaultValue={isbn} />
      {error && <p className='text-center'>{error}</p>}
      {bookId && (
        <div className='mt-2 flex flex-col justify-center mx-auto'>
          <BookCard bookId={bookId} />
          {/* SellForm should been updated when bookId is changed */}
          <SellForm key={bookId} />
        </div>
      )}
    </>
  )
}
