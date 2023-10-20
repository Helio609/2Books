export default function Footer() {
  return (
    <div className='container mx-auto h-12 flex justify-center items-center rounded-xl border-2 border-black border-dashed'>
      <span className='text-sm text-gray-500'>
        © 2021-2022{' '}
        <a href='#' className='hover:underline'>
          2Books™
        </a>
        . All Rights Reserved.
      </span>
    </div>
  )
}
