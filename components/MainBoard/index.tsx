import React from 'react'
import { ControlPanel } from '../ControlPanel'
import TilesStats from '../TilesStats'
import NftGrid from './NftGrid'

function GridContainer() {
  return (
    <div className='flex bg-box items-center justify-between gap-5 rounded'>
      <div className='card-custom flex flex-col gap-2'>
        <div className='w-full flex items-center justify-around bg-box border border-button-main-light rounded p-2'>
          <p>X:1 Y:2</p>
          <p>Owner:0x.....2323fe</p>
        </div>
        <NftGrid />
      </div>
      <div className='card-custom flex flex-col items-end justify-between gap-3'>
        <ControlPanel />
        <TilesStats />
      </div>
    </div>
  )
}

export default GridContainer
