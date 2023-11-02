import Arrows from '@/components/Joystick/Arrows'
import Buttons from '@/components/Joystick/Buttons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return (
    <main
      className={
        'flex lg:flex-row flex-col mt-4 p-4 container-custom bg-blue-bg lg:rounded-[70px] rounded-[50px] justify-between'
      }>
      <Head key='home-page'>
        <title>31CSGAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* Joystick Arrows */}
      <div className='lg:flex hidden'>
        <Arrows />
      </div>
      {/* Screen */}
      {/* <SingleGridV2 /> */}
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
