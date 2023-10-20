'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../supabase.types'
import { revalidatePath } from 'next/cache'

export const updateProfileAction = async (formData: FormData) => {
  const supabase = createServerActionClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const university = formData.get('university')?.toString()
  const campus = formData.get('campus')?.toString()
  const grade = formData.get('grade')?.toString()
  const academy = formData.get('academy')?.toString()
  const notifyEmail = formData.get('notify_email')?.toString()
  const address = formData.get('address')?.toString()
  const wechat = formData.get('wechat')?.toString()
  const gender = formData.get('gender')?.toString()

  // Ignore the form data validation, because all condition are acceptable

  const { data, error } = await supabase
    .from('profiles')
    .update({
      university: university,
      campus: campus,
      grade: Number(grade) == 0 ? null : Number(grade),
      academy: academy,
      notify_email: notifyEmail,
      address: address,
      wechat: wechat,
      gender: gender,
    })
    .eq('id', session?.user.id!)

  if (error) {
    return { error: error.message, done: false }
  }

  revalidatePath('/')

  return { done: true }
}
