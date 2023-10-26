import Stats from '@/components/Stats'
import SwapCard from '@/components/SwapCard'
import TokensCard from '@/components/TokensCard'
import MintsButtons from '@/components/WebButtons/MintsAction'
import useMulticall from '@/hooks/useMulticall'
import Head from 'next/head'

export default function Home() {
  const { isLoading } = useMulticall()
  return (
    <main className={'flex flex-col gap-[40px] mt-4 items-center container-custom'}>
      <Head key='home-page'>
        <title>31CSGAME</title>
        <meta name='description' content='An incentive coordination game.' />
      </Head>
      {/* STATS SECTION */}
      <Stats isLoading={isLoading} />
      {/* CARDS SECTION */}
      <section className='flex w-full gap-5 flex-col lg:flex-row'>
        {/* LEFT SIDE */}
        <TokensCard />
        {/* RIGHT SIDE */}
        <SwapCard />
      </section>
      <MintsButtons />
    </main>
  )
}
