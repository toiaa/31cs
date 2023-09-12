import Amount from '@/components/Amount'
import ImageTokens from '@/components/ImageTokens'
import useBalance from '@/hooks/useBalance'
import { Token } from '@/ts/types'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'

const TokenInfo = ({ item }: { item: Token }) => {
  const { getBalance } = useBalance()

  const { id, symbol } = item
  const balance = getBalance(id, symbol)
  const formatAmount = formatEther(balance)

  return (
    <>
      <div className='flex gap-2 items-center '>
        <p>{item.symbol}</p>
        <ImageTokens symbol={item.symbol} />
      </div>
      <Amount amount={formatAmount} type='number' />
    </>
  )
}

export default TokenInfo
