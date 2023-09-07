import { useStatusContracts } from '@/store'
import { Balance } from '@/ts/types'
import dynamic from 'next/dynamic'
import React from 'react'

const Amount = dynamic(() => import('../Amount'))

const TokenBalance = ({ amount, price }: Balance) => {
  const { loadingBonding } = useStatusContracts()

  return (
    <div className='flex flex-col w-[100px] gap-1 items-end'>
      <Amount amount={amount} type='number' isLoading={loadingBonding} />
      <Amount amount={price} color='#9CA3AF' type='price' isLoading={loadingBonding} />
    </div>
  )
}

export default TokenBalance
