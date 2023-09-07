import VoteSection from '@/components/Vote'
import Head from 'next/head'

export default function Vote() {
  return (
    <main className='container-custom mt-4'>
      <Head key='Vote-page'>
        <title>Vote - TOKENPROJECT</title>
        <meta name='description' content='This page have the Vote information' />
      </Head>
      <VoteSection />
    </main>
  )
}
