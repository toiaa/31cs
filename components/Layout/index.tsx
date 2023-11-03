import { WrapperInterface } from '@/ts/interfaces'
import localFont from 'next/font/local'
import Footer from '../Footer'
import Navbar from '../Navbar'

const pixeBoy = localFont({ src: '../../utils/fonts/Pixeboy.ttf' })
export default function Layout({ children }: WrapperInterface) {
  return (
    <div className={`relative sm:px-20 px-2 py-4 min-h-screen flex flex-col ${pixeBoy.className}`}>
      <header>
        <Navbar />
      </header>
      <main className='flex flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
