import React from 'react'
import Amount from '../../Amount'

const TilesStats = () => {
  return (
    <div className='flex flex-col p-3 w-full h-[210px] bg-box items-center justify-around border border-button-main-light rounded '>
      <>
        <div className='flex flex-col'>
          <p className='text-md'>343 oTOKENweek</p>
          <div className='flex items-center text-gray-subtitle '>
            <span>≈</span>
            <Amount amount='0' type='price' color='#818995' />
            <p>/week</p>
          </div>
        </div>
        <p className='text-md'>0 Tiles Owned</p>
        <p className='text-md'>0 Tiles Placed</p>
      </>
    </div>
  )
}

export default TilesStats
