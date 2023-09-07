import { WrapperInterface } from '@/ts/interfaces'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function Layout({ children }: WrapperInterface) {
  return (
    <div className='relative sm:px-4 px-2 py-4 min-h-screen flex flex-col '>
      <header>
        <Navbar />
      </header>
      <main className='flex flex-1'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
