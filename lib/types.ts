/** The response from juhe isbn api */
export interface JuheApiResponse {
  reason: string
  result: {
    levelNum: string
    subtitle: string
    author: string
    pubdate: string
    origin_title: string
    binding: string
    translator: string
    pages: string
    images_medium: string
    images_large: string
    publisher: string
    isbn10: string
    isbn13: string
    title: string
    summary: string
    price: string
  }
  error_code: number
}