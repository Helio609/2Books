'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getURL, isEduPostfix } from '../utils'
import { createClient } from '@supabase/supabase-js'

export const loginAction = async (prevState: any, formData: FormData) => {
  const email = formData.get('email')?.toString()

  // Return if email is null or empty
  if (!email || email.length === 0 || email.toString().trim() === '') {
    return { error: '请填写正确的邮箱', done: false }
  }

  // TODO: Enable it in future
  // if (!isEduPostfix(email)) {
  //   return { error: '只允许@*.edu.cn用户使用', done: false }
  // }

  const supabaseByCookie = createServerActionClient({ cookies })

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  // Auto confirm the user first
  await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  })

  // Starting auth, send a email to user
  const res = await supabaseByCookie.auth.signInWithOtp({
    email,
    options: {
      // According to server url, setup on supabase auth configuration
      emailRedirectTo: `${getURL()}/auth/callback`,
    },
  })

  // If supabase auth service return error
  if (res.error) {
    return { error: res.error.message, done: false }
  }

  return { done: true }
}
