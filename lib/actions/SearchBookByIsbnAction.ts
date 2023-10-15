'use server'

import { redirect } from 'next/navigation'
import { getURL } from '../utils'

export const searchBookByIsbnAction = async (formData: FormData) => {
  const isbn = formData.get('isbn')?.toString().trim()

  if (!isbn || isbn.length === 0) {
    return
  }

  // Request the Juhe isbn api
  const res = await fetch(`${getURL}/api/isbn/${isbn}`)
  if (res.status != 200) {
    redirect('/books/sell?error=Internal error')
  }

  const book = await res.json()

  if (book.error) {
    redirect('/books/sell?error=Can not find the book')
  }

  redirect(`/books/sell?bookId=${book.id}&isbn=${isbn}`)
}
