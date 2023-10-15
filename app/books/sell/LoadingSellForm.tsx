import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingSellForm() {
  return (
    <div className='flex justify-center items-center h-14 rounded-lg border-2 border-black border-dashed'>
      <ArrowPathIcon className='w-6 h-6 animate-spin' />
    </div>
  )
}
