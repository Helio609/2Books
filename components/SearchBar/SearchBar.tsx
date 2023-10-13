'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement | null>(null)

  const searchParams = new URLSearchParams(useSearchParams())

  const router = useRouter()

  const navigateTo = (search?: string) => {
    if (search) {
      searchParams.set('search', search)
    } else {
      searchParams.delete('search')
    }
    router.replace(`/books?${searchParams.toString()}`)
  }

  const onAvailableChange = (checked: boolean) => {
    if (checked) {
      searchParams.set('available', 'true')
    } else {
      searchParams.delete('available')
    }
    router.replace(`/books?${searchParams.toString()}`)
  }

  return (
    <div className='flex items-center space-x-2'>
      Search:
      {/* TODO: Replace with a auto complete and display */}
      <input ref={searchRef} className='rounded-md outline-0 border-2 border-gray-500 border-dashed' type='text' />
      <button
        onClick={() => {
          navigateTo(searchRef.current?.value)
        }}
      >
        <MagnifyingGlassIcon className='w-7 h-7 p-1 rounded-full border-2 border-black border-dashed' />
      </button>
      <div className='flex items-center'>
        <input
          type='checkbox'
          defaultChecked={true}
          onChange={(e) => {
            onAvailableChange(e.target.checked)
          }}
        />
        有货
      </div>
    </div>
  )
}
