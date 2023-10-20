import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Database } from './lib/supabase.types'
import { getURL, isNecessaryInfoExist } from './lib/utils'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refreshing it if necessary.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Route protection
  const pathname = req.nextUrl.pathname

  // Check the pathname, if session is null, redirect user to login
  // TODO: /api/isbn is not included
  if ((pathname.startsWith('/books') || pathname.startsWith('/my') || pathname.startsWith('/order')) && !session) {
    return NextResponse.redirect(`${getURL()}/login`)
  }

  // Before buy or sell, user should set the necessary information like notify email
  if ((pathname.startsWith('/books/sell') || pathname.startsWith('/books/buy')) && session) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('university, campus, academy, notify_email')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      return NextResponse.redirect(`${getURL()}/auth/error?message=${profileError.message}`)
    }

    if (!isNecessaryInfoExist(profile)) {
      return NextResponse.redirect(`${getURL()}/my?message=Update your profile first`)
    }
  }

  return res
}
