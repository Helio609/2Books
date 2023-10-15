import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingBookCard() {
  return (
    <div className='flex justify-center items-center rounded-xl shadow-md border-2 border-black border-dashed w-full min-w-[25rem] max-w-[30rem] h-[10rem]'>
      <ArrowPathIcon className='w-6 h-6 animate-spin' />
    </div>
  )
}
