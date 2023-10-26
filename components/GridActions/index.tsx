import { GridActionsInterface } from '@/ts/interfaces'
import React from 'react'
import ControlPanel from '../ControlPanel'
import TilesStats from '../TilesStats'

const GridActions = ({ clearPixelSelect }: GridActionsInterface) => {
  return (
    <div className='card-custom grid grid-cols-2 items-center gap-3'>
      <ControlPanel clearPixelSelect={clearPixelSelect} />
      <TilesStats />
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
      <div className='grid-cards'></div>
    </div>
  )
}

export default GridActions
