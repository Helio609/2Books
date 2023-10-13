import { Footer, Header } from '@/components'
import type { Metadata } from 'next'
import './globals.css'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN'>
      <body>
        <div className='flex flex-col h-screen'>
          <Header />
          <main className='container mx-auto p-2 flex flex-col flex-1 rounded-xl border-2 border-black border-dashed'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
