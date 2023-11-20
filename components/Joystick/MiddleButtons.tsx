import { toggleStatsModal } from '@/store/methods'
import { useRouter } from 'next/router'
import React from 'react'

const MiddleButtons = () => {
  const { pathname } = useRouter()

  const onOpenStats = () => {
    if (pathname.includes('nft')) {
      toggleStatsModal()
    }
  }

  return (
    <section className='flex h-full gap-2'>
      <button onClick={onOpenStats} className='flex flex-col items-center'>
        <div className='middle-btn' />
        <p>Stats</p>
      </button>
    </section>
  )
}

export default MiddleButtons
