import TrophyIcon from '@/assets/Icons/TrophyIcon'
import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col items-center p-4'>
      <TrophyIcon color='yellow' size={60} />
      <h3 className='text-lg font-semibold text-center'>You are eligible for the aidrop</h3>
      <p className='text-sm text-gray-subtitle text-center'>You will be able to claim your tokens</p>
    </div>
  )
}

export default Header
