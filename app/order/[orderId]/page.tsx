import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function OrderPage() {
  const supabase = createServerComponentClient({ cookies })
  
  return <div>page</div>
}
