import MapIcon from '@/assets/Icons/MapIcon'
import SpeedIcon from '@/assets/Icons/SpeedIcon'
import React from 'react'

const TilesStats = () => {
  return (
    <div className='flex flex-col p-3 w-[350px] h-64 bg-box items-center justify-around border border-button-main-light rounded '>
      <div className='flex justify-between items-center gap-5'>
        <SpeedIcon size={40} />
        <p className='text-md'>112 Tiles Owned</p>
      </div>
      <div className='flex justify-between items-center gap-5'>
        <MapIcon size={40} /> <p className='text-md'>600 Tiles Placed</p>
      </div>
    </div>
  )
}

export default TilesStats
