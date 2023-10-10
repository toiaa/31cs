import SinglePlot from '@/components/SinglePlot'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  return (
    <main className={'flex flex-col gap-[40px] mt-4 items-center container-custom'}>
      <Head key='plot-single-page'>
        <title>single token</title>
        <meta name='description' content='Single view of your tiles' />
      </Head>
      <section className='container-custom flex flex-row gap-[30px]   items-center'>
        <SinglePlot svgId={id} />
      </section>
    </main>
  )
}
