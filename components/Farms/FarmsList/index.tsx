import SquareLoader from '@/components/Loader/SquareLoader'
import { GaugeCardList } from '@/ts/types'
import dynamic from 'next/dynamic'
import React from 'react'

const FarmCard = dynamic(() => import('../FarmCard'), {
  ssr: false,
})

const FarmList = ({ filteredGauges, isLoading }: { filteredGauges: GaugeCardList; isLoading: boolean }) => {
  if (isLoading)
    return (
      <div className='w-full flex flex-col items-center gap-10'>
        <h1 className='text-xl font-bold'>Fetching Farms</h1>
        <SquareLoader />
      </div>
    )

  if (filteredGauges.length <= 0)
    return <p className='flex items-center justify-center h-[500px] text-[20px]'>No search results</p>

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {filteredGauges.map((farm) => (
        <FarmCard key={`farm-${farm.gaugeAddress}`} {...farm} />
      ))}
    </div>
  )
}

export default FarmList
