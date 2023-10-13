'use client'

import { loginAction } from '@/lib/actions/LoginAction'
import { ArrowLongRightIcon, ArrowPathIcon, CheckIcon } from '@heroicons/react/24/solid'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const initialState = {
  error: null,
  done: false,
}

function LoginButton({ state }: { state: any }) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className={`rounded-full border-2 border-dashed border-black p-2 ${pending ? 'animate-spin' : ''}`}
      disabled={pending || state.done}
    >
      {pending ? (
        <ArrowPathIcon className='w-5 h-5' />
      ) : state.done ? (
        <CheckIcon className='w-5 h-5' />
      ) : (
        <ArrowLongRightIcon className='w-5 h-5' />
      )}
    </button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState)
  return (
    <>
      <form action={formAction} className='p-2 flex items-center rounded-full border-2 border-black border-dashed'>
        EMAIL:
        <input name='email' className='outline-none w-[18rem]' type='email' required />
        <LoginButton state={state} />
      </form>
      {state.error && <p>Error: {state.error}，请稍后重试。</p>}
      {state.done && <p>Message: 请检查您的邮箱或垃圾箱哦。</p>}
    </>
  )
}
