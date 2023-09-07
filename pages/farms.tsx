import FarmsSection from '@/components/Farms'
import Head from 'next/head'

export default function Farms() {
  return (
    <main className='container-custom mt-4'>
      <Head key='Farms-page'>
        <title>Farms - TOKENPROJECT</title>
        <meta name='description' content='This page have the farms information' />
      </Head>
      <FarmsSection />
    </main>
  )
}
