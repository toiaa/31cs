import React from 'react'
import { ControlPanel } from '../ControlPanel'
import TilesStats from '../TilesStats'
import NftGrid from './NftGrid'

function GridContainer() {
  return (
    <div className='card-custom flex flex-col items-center justify-between gap-5'>
      <div className='flex w-full items-center'>
        <div className='card-custom flex flex-col items-start justify-between gap-3'>
          <ControlPanel />
          <TilesStats />
        </div>
        <NftGrid />
      </div>
    </div>
  )
}

export default GridContainer
