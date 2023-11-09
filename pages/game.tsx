import GeneralGrid from '@/components/GeneralGrid'
import Arrows from '@/components/Joystick/Arrows'
import Buttons from '@/components/Joystick/Buttons'
import localFont from 'next/font/local'
import Head from 'next/head'
const pixeBoy = localFont({ src: '../utils/fonts/Pixeboy.ttf' })
export default function Game() {
  return (
    <main
      className={`flex lg:flex-row flex-col mt-4 p-4 container-custom bg-[#5D379D] lg:rounded-[70px] rounded-[50px] justify-between ${pixeBoy.className}`}>
      <Head key='home-page'>
        <title>31ST CENTURY GAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* Joystick Arrows */}
      <div className='lg:flex hidden'>
        <Arrows />
      </div>
      {/* Screen */}
      <GeneralGrid />
      {/*Joystick Buttons */}
      <div className='lg:flex hidden'>
        <Buttons />
      </div>
      {/* MOBILE BUTTONS */}
      <section className='lg:hidden w-full flex justify-between'>
        <Arrows />
        <Buttons />
      </section>
    </main>
  )
}
