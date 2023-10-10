import SinglePlot from '@/components/SinglePlot'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  return (
    <main className={'flex flex-col mt-4 container-custom'}>
      <Head key='plot-single-page'>
        <title>single token</title>
        <meta name='description' content='Single view of your tiles' />
      </Head>
      <section className='flex items-center '>
        <SinglePlot svgId={id} />
      </section>
    </main>
  )
}
