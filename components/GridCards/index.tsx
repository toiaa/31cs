import { useRouter } from 'next/router'
import React from 'react'
import ControlPanel from './ControlPanel'
import TilesStats from './TilesStats'

const GridCards = () => {
  const router = useRouter()
  const pathname = router.pathname
  const isPixel = pathname === '/grid'
  return (
    <div className='card-custom grid grid-cols-2 items-center gap-3'>
      <ControlPanel isPixel={isPixel} />
      <TilesStats />
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
    </div>
  )
}

export default GridCards
