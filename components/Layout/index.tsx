import { WrapperInterface } from '@/ts/interfaces'
import { Jost } from 'next/font/google'
import Footer from '../Footer'
import Navbar from '../Navbar'

const jost = Jost({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }: WrapperInterface) {
  return (
    <div className={`relative sm:px-20 px-2 py-4 min-h-screen flex flex-col ${jost.className}`}>
      <header>
        <Navbar />
      </header>
      <main className='flex flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
