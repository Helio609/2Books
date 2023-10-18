import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { getURL } from './lib/utils'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refreshing it if necessary.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Route protection
  const pathname = req.nextUrl.pathname

  // Check the pathname, if session is null, redirect user to login
  // TODO: /api/isbn is not included
  if (
    (pathname.startsWith('/books') ||
      pathname.startsWith('/my') ||
      pathname.startsWith('/order')) &&
    !session
  ) {
    return NextResponse.redirect(`${getURL()}/login`)
  }

  return res
}
