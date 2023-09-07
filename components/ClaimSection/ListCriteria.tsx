import ExternalLinkIcon from '@/assets/Icons/ExternalLinkIcon'
import React from 'react'
import Amount from '../Amount'
import Criteria from './Criteria'

const ListCriteria = () => {
  return (
    <div className='flex flex-col w-full p-4 gap-3'>
      <div className='flex w-full justify-between items-center'>
        <h5 className='font-semibold text-gray-subtitle'>ELIGIBILITY CRITERIA</h5>
        <div className='flex items-center gap-1 hover:opacity-50 transition-all cursor-pointer'>
          <p>Learn more</p>
          <ExternalLinkIcon />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <Criteria isCheck />
        <Criteria />
        <Criteria isCheck />
        <Criteria />
        <Criteria isCheck />
        <Criteria />
      </div>
      <div className='flex w-full justify-between items-center border-t border-t-1 border-t-gray-borders p-2'>
        <p className='text-lg'>Total</p>
        <Amount amount='1002.23' weight='semibold' type='number' />
      </div>
    </div>
  )
}

export default ListCriteria
