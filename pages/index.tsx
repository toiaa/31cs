import MainBoard from '@/components/MainBoard'
import Head from 'next/head'

export default function Home() {
  return (
    <main className={'flex flex-col mt-4 items-center container-custom'}>
      <Head key='home-page'>
        <title>31CSGAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* GRID SECTION */}
      <section className='flex justify-center items-center'>
        <MainBoard />
      </section>
    </main>
  )
}
