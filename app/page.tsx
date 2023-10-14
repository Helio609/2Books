import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  // TODO: Handle get session error

  return (
    <>
      <p>您好，在校的大学生:</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;您是否还在囤积着无用的课本、教材，无奈于多抓鱼、孔夫子旧书网的淫威，无法方便地进行无用书本的回收？
      </p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;咱不就来了吗？感谢您千辛万苦成功登录此网站，接下来请您简单地设置一些必要的信息，以方便他人交流。
        或者选择作为信息的接收方，挑选所需要的，并通过该网站方便地联系对方，达到所需。
      </p>
      {!session && (
        <div className='flex flex-1 space-x-4 justify-center items-center'>
          <Link
            href='/login'
            className='shadow-lg bg-gradient-to-b from-gray-50 to-gray-200 hover:text-gray-500 p-2 md:p-4 rounded-lg border-2 border-black border-dashed'
          >
            登录2Books
          </Link>
        </div>
      )}
      {session && (
        <>
          <div className='flex flex-1 space-x-4 justify-center items-center'>
            <Link
              href='/books'
              className='shadow-lg bg-gradient-to-b from-gray-50 to-gray-200 hover:text-gray-500 p-2 md:p-4 rounded-lg border-2 border-black border-dashed'
            >
              挑选书籍
            </Link>
            <Link
              href='/books/sell'
              className='shadow-lg bg-gradient-to-l from-gray-50 to-gray-200 hover:text-gray-500 p-2 md:p-4 rounded-lg border-2 border-black border-dashed'
            >
              发布信息
            </Link>
          </div>
          <p className='text-center'>技术支持: helio609.dev@outlook.com</p>
        </>
      )}
    </>
  )
}
