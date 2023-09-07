import React from 'react'
import Amount from '../Amount'
import CheckStatus from '../CheckStatus'
import TooltipQuestion from '../TooltipQuestion'

const Criteria = ({ isCheck = false }: { isCheck?: boolean }) => {
  return (
    <div className='flex w-full justify-between items-center'>
      <div className='flex gap-1 w-full items-center'>
        <CheckStatus isCheck={isCheck} />
        <p>Description claim reward</p>
        <TooltipQuestion text='Example text' />
      </div>
      <div className='flex gap-1 items-center'>
        <Amount amount='12.23' weight='semibold' color='#818995' type='number' />
        <p className='text-gray-subtitle'>ETH</p>
      </div>
    </div>
  )
}

export default Criteria
