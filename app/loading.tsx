import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Loading() {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <ArrowPathIcon className='w-6 h-6 animate-spin' />
    </div>
  )
}
