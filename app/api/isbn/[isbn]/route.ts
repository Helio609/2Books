import { JuheApiResponse } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { isbn: string } }) {
  const { isbn } = params

  // First query from supabase, if null then request the juhe api
  // Changed from createRouteHandlerClient to createClient
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  let book = await supabase.from('books').select('*').or(`isbn10.eq.${isbn},isbn13.eq.${isbn}`).maybeSingle()

  // Something went wrong with supabase
  if (book.error) {
    return NextResponse.json({ error: book.error.message }, { status: 500 })
  }

  if (book.data) {
    return NextResponse.json(book.data)
  }

  // Build the search params like key=&isbn=
  // ensure the JUHE_ISBN_KEY is exist
  const searchParams = new URLSearchParams()
  searchParams.set('key', process.env.JUHE_ISBN_KEY!)
  searchParams.set('sub', isbn)

  // Fetch the juhe api
  const res = await fetch(`${process.env.JUHE_ISBN_API}?${searchParams.toString()}`)
  const json = (await res.json()) as JuheApiResponse
  if (!res.ok || json.reason != '查询成功' || (!json.result.title && !json.result.subtitle)) {
    return NextResponse.json({ error: '无法在数据库中找到该书籍' }, { status: 404 })
  }

  // Insert the book data into supabase
  const {
    title,
    subtitle,
    summary,
    author,
    pubdate,
    isbn10,
    isbn13,
    publisher,
    price,
    images_large: image,
  } = json.result
  book = await supabase
    .from('books')
    .insert({
      title,
      subtitle,
      summary,
      author,
      pubdate,
      isbn10,
      isbn13,
      publisher,
      price: Number(price) || 0,
      image,
    })
    .select()
    .single()

  if (book.error) {
    return NextResponse.json({ error: book.error.message })
  }

  return NextResponse.json(book.data)
}
