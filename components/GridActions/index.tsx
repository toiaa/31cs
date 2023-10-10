import React from 'react'
import ControlPanel from '../ControlPanel'
import TilesStats from '../TilesStats'

const GridActions = () => {
  return (
    <div className='card-custom grid grid-cols-2 items-center gap-3'>
      <ControlPanel />
      <TilesStats />
      <div className='flex flex-col p-3 w-full h-[210px] bg-box items-center justify-around border border-button-main-light rounded '></div>
      <div className='flex flex-col p-3 w-full h-[210px] bg-box items-center justify-around border border-button-main-light rounded '></div>
      <div className='flex flex-col col-span-2 p-3 h-36 bg-box items-center justify-around border border-button-main-light rounded '></div>
    </div>
  )
}

export default GridActions
