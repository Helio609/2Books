import { Database } from '@/lib/supabase.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import BuyForm from './BuyForm'

export default async function SellCard({ sellId }: { sellId: string }) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: sell, error } = await supabase.from('sells').select(`*, books(*)`).eq('id', sellId).single()

  if (error) {
    return (
      <div className='flex justify-center items-center space-x-2 rounded-xl shadow-md border-2 border-black border-dashed w-[30rem] h-[10rem]'>
        Error: {error.message}
      </div>
    )
  }

  if (!sell.books) {
    return (
      <div className='flex justify-center items-center space-x-2 rounded-xl shadow-md border-2 border-black border-dashed w-[30rem] h-[10rem]'>
        Error: Book not found!
      </div>
    )
  }

  return (
    <div className='flex space-x-2 rounded-xl shadow-md border-2 border-black border-dashed w-[30rem] h-[10rem]'>
      <Image
        className='rounded-xl border-r-2 border-black border-dashed'
        src={sell.books.image}
        height={144}
        width={122}
        alt={`book for ${sell.books.id}`}
      />
      <div className='flex flex-col justify-center overflow-hidden flex-1 space-y-2'>
        <p className='text-md text-center truncate'>《{sell.books.title}》</p>
        {sell.books.subtitle != '' && <p className='text-sm text-center truncate'>- {sell.books.subtitle}</p>}
        <p className='text-sm text-gray-500 truncate'>Author: &nbsp;&nbsp;&nbsp;{sell.books.author}</p>
        <p className='text-sm text-gray-500 truncate'>Publisher: {sell.books.publisher}</p>
        <p className='text-sm text-gray-500 truncate'>Pubdate: &nbsp;&nbsp;{sell.books.pubdate}</p>
        <div className='flex pr-2 items-center'>
          <p className='flex-1 text-sm text-gray-500 truncate'>
            Price: &nbsp;&nbsp;&nbsp;&nbsp;<span className='text-black text-lg shadow-xl'>{sell.price}元</span>&nbsp;
            <span>(原价{sell.books.price}元)</span>
          </p>
          <BuyForm />
        </div>
      </div>
    </div>
  )
}
