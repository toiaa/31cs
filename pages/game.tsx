import GeneralGrid from '@/components/GeneralGrid'
import Arrows from '@/components/Joystick/Arrows'
import Buttons from '@/components/Joystick/Buttons'
import MiddleButtons from '@/components/Joystick/MiddleButtons'
import localFont from 'next/font/local'
import Head from 'next/head'
const pixeBoy = localFont({ src: '../utils/fonts/Pixeboy.ttf' })
export default function Game() {
  return (
    <main
      className={`flex flex-col mt-4 p-4 container-custom bg-[#5D379D] w-[450px] lg:w-[450px] rounded-[50px] justify-between ${pixeBoy.className}`}>
      <Head key='home-page'>
        <title>31ST CENTURY GAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* Screen */}
      <GeneralGrid />
      {/* MOBILE BUTTONS */}
      <section className='flex justify-between items-end p-4 pb-0'>
        <Arrows />
        <MiddleButtons />
        <Buttons />
      </section>
    </main>
  )
}
