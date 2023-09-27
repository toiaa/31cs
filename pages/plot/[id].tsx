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
        <meta name='description' content='An incentive coordination system.' />
      </Head>
      <section className='flex w-full flex-col'>
        <SinglePlot svgId={id} />
      </section>
    </main>
  )
}
