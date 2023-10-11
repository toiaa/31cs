import React from 'react'
import GridActions from '../GridActions'
import NftGrid from './NftGrid'

function GridContainer() {
  return (
    <div className='flex items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2'>
        <div className='flex items-center justify-around border border-button-main-light rounded p-2'>
          <p>X:1 Y:2</p>
          <p>Owner:0x.....2323fe</p>
        </div>
        <NftGrid />
      </div>
      <GridActions />
    </div>
  )
}

export default GridContainer
