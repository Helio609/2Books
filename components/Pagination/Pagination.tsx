'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({ more }: { more: boolean }) {
  const router = useRouter()

  const searchParams = new URLSearchParams(useSearchParams())

  const page = parseInt(searchParams.get('page') ?? '1')

  const changePage = (action: 'inc' | 'dec') => {
    searchParams.set('page', action == 'inc' ? (page + 1).toString() : (page - 1).toString())
    router.replace(`/books?${searchParams.toString()}`)
  }

  return (
    <div>
      {page != 1 && (
        <button onClick={() => changePage('dec')} className='rounded-full border-2 border-black border-dashed p-2'>
          <ArrowLeftIcon className='w-6 h-6' />
        </button>
      )}
      {more && (
        <button onClick={() => changePage('inc')} className='rounded-full border-2 border-black border-dashed p-2'>
          <ArrowRightIcon className='w-6 h-6' />
        </button>
      )}
    </div>
  )
}
