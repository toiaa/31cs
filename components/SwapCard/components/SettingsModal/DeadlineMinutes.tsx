import StopwatchIcon from '@/assets/Icons/StopwatchIcon'
import { DeadlineMinutesInterface } from '@/ts/interfaces'
import React from 'react'
const DeadlineMinutes = ({ minutes }: DeadlineMinutesInterface) => {
  return (
    <div className='flex-center bg-main-800 py-1 px-2 rounded bg-opacity-3'>
      <StopwatchIcon color='white' size={20} />
      <p className='text-main-500'>{minutes}</p>
    </div>
  )
}

export default DeadlineMinutes
