import { Footer, Header } from '@/components'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Chinese font declare
const chineseFont = localFont({
  src: './SmileySans-Oblique.ttf.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '2Books | 校内二手书信息交流',
  description: 'A platform for zstuer to exchange their old books',
  authors: [
    {
      name: 'Helio',
    },
    {
      name: 'Dig Huang',
    },
  ],
}

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN' className={chineseFont.className}>
      <body>
        <div className='flex flex-col h-[calc(100dvh)]'>
          <Header />
          <main className='overflow-y-scroll container mx-auto p-2 flex flex-col flex-1 rounded-xl border-2 border-black border-dashed'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
