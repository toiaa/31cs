import { DetailAmountInterface } from '@/ts/interfaces'
import dynamic from 'next/dynamic'
import React from 'react'

const Amount = dynamic(() => import('../Amount'))

const DetailAmount = ({ label, type, amount, weight, color, isLoading }: DetailAmountInterface) => {
  return (
    <div className='flex gap-1 text-gray text-sm'>
      <p>
        {label.charAt(0).toUpperCase() + label.slice(1)}
        {label != '≈' ? ':' : ''}
      </p>
      <Amount
        amount={amount}
        isLoading={isLoading}
        type={type}
        weight={weight}
        color={color}
        decimals={type === 'number' ? 6 : 2}
      />
    </div>
  )
}

export default DetailAmount
