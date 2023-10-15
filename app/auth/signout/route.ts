import { getURL } from '@/lib/utils'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  await supabase.auth.signOut()

  return NextResponse.redirect(`${getURL()}/login`, {
    status: 301,
  })
}
