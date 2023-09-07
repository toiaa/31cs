import dynamic from 'next/dynamic'
import React from 'react'

const CountdownSection = dynamic(() => import('./CountdownSection'), {
  ssr: false,
})

const InformationVote = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='font-bold text-xl'>Voting</h2>
      <div className='flex flex-col gap-1'>
        <h5 className='font-semibold text-lg'>Time till next vote:</h5>
        <CountdownSection />
      </div>
    </div>
  )
}

export default InformationVote
