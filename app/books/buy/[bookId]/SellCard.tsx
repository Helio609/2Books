import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BuyForm from './BuyForm'
import { Database } from '@/lib/supabase.types'

export default async function SellCard({ sellId }: { sellId: string }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: sell, error: sellError } = await supabase
    .from('sells')
    .select(`*, profiles(*)`)
    .eq('id', sellId)
    .single()

  // TODO: Handle sellError

  return (
    <div className='p-2 flex justify-between items-center rounded-lg border-2 border-black border-dashed'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        <p>University: {sell?.profiles?.university ?? '未填写'}</p>
        <p>Campus: {sell?.profiles?.campus ?? '未填写'}</p>
        <p>Academy:{sell?.profiles?.academy ?? '未填写'}</p>
        <p>Grade:{sell?.profiles?.grade ?? '未填写'}</p>
        <p>Gender: {sell?.profiles?.gender ?? '保密'}</p>
        <p>Price: {sell?.price}元</p>
      </div>
      <BuyForm sellId={sell?.id!} sellerId={sell?.profiles?.id!} />
    </div>
  )
}
