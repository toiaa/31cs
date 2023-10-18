import Stats from '@/components/Stats'
import SwapCard from '@/components/SwapCard'
import TokensCard from '@/components/TokensCard'
import Head from 'next/head'

export default function Home() {
  return (
    <main className={'flex flex-col gap-[40px] mt-4 items-center container-custom'}>
      <Head key='home-page'>
        <title>31CSGAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* STATS SECTION */}
      <Stats />
      {/* CARDS SECTION */}
      <section className='flex w-full gap-5 flex-col lg:flex-row'>
        {/* LEFT SIDE */}
        <TokensCard />
        {/* RIGHT SIDE */}
        <SwapCard />
      </section>
    </main>
  )
}
