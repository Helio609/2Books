import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Header() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (!session?.user || sessionError) {
    return (
      <div className='flex container mx-auto justify-center items-center h-12 my-4 rounded-xl border-2 border-dashed border-black'>
        <Link href='/' className='text-2xl'>
          Welcome to 2books!
        </Link>
      </div>
    )
  }

  return (
    <div className='flex p-2 justify-between container mx-auto items-center my-4 rounded-xl border-2 border-dashed border-black'>
      <div className='flex flex-col items-center'>
        <Link href='/' className='text-2xl'>
          Welcome to 2books!
        </Link>
        <p className='text-sm text-gray-500'>{session.user.email}</p>
      </div>
      <div className='flex flex-col'>
        <Link className='hover:text-gray-500' href='/my'>
          个人中心
        </Link>
        <Link className='hover:text-gray-500' href='/auth/signout'>
          退出登录
        </Link>
      </div>
    </div>
  )
}
