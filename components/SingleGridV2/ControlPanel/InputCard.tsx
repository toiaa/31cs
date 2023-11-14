import Amount from '@/components/Amount'
import useBalance from '@/hooks/useBalance'
import useMulticall from '@/hooks/useMulticall'
import { useStoreSelectedTiles } from '@/store'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'

const InputCard = () => {
  const { getBalance, getPrice } = useBalance()
  const { isLoading } = useMulticall()
  const balanceOTOKEN = getBalance('otoken')
  const priceOTOKEN = getPrice('otoken')
  const { selectedTiles } = useStoreSelectedTiles()
  const formatBalanceOTOKEN = formatEther(balanceOTOKEN)
  const OTOKENAmount = selectedTiles.length.toString()
  const priceAmount = Number(OTOKENAmount) * Number(formatEther(priceOTOKEN))
  return (
    <div className='flex items-center justify-between w-full p-2'>
      <div className='flex gap-2'>
        <div className='flex flex-center border border-gray-borders rounded w-32 h-7'>
          <Amount amount={OTOKENAmount} type='number' />
        </div>
        <div className='flex items-center gap-1'>
          ≈<Amount amount={priceAmount.toString()} decimals={2} type='price' />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <p className='font-thin text-sm text-gray-subtitle'>Balance:</p>
        <Amount amount={formatBalanceOTOKEN} type='number' />
        <p className='font-thin text-md'>OTOKEN</p>
      </div>
    </div>
  )
}

export default InputCard
