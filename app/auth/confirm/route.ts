import { getURL } from '@/lib/utils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token_hash = searchParams.get('token_hash')

  if (!token_hash) {
    return NextResponse.redirect(`${getURL()}/auth/error?message=Missing token hash`)
  }

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { error } = await supabase.auth.verifyOtp({ type: 'email', token_hash })
  if (error) {
    return NextResponse.redirect(`${getURL()}/auth/error?message=${error.message}`)
  }

  return NextResponse.redirect(`${getURL()}`)
}
