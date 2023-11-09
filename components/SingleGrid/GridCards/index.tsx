import React from 'react'
import ControlPanel from './ControlPanel'
import TilesStats from './TilesStats'

const GridCards = () => {
  return (
    <div className='card-custom grid grid-cols-2 items-center gap-3'>
      <ControlPanel />
      <TilesStats />
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
    </div>
  )
}

export default GridCards
