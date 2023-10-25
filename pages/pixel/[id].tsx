import SingleGrid from '@/components/SingleGrid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  return (
    <main className={'flex flex-col mt-4 container-custom'}>
      <Head key='plot-single-page'>
        <title>single token</title>
        <meta name='description' content='Single view of your tiles' />
      </Head>
      <section className='flex justify-center items-center'>
        <SingleGrid nftId={id} />
      </section>
    </main>
  )
}
