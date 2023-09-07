import ClaimSection from '@/components/ClaimSection'
import Head from 'next/head'

export default function Claim() {
  return (
    <main className='container-custom mt-4 flex justify-center'>
      <Head key='Claim-page'>
        <title>Claim - TOKENPROJECT</title>
        <meta name='description' content='This page have the claim information' />
      </Head>
      <ClaimSection />
    </main>
  )
}
