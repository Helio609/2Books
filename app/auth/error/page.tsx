import Link from 'next/link'

export default function AuthErrorPage(req: { searchParams: { message: string } }) {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h2>Error</h2>
      <p>{req.searchParams.message}</p>
      <Link href='/'>Return Home</Link>
    </div>
  )
}
