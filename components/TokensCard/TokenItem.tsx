import useBalance from '@/hooks/useBalance'
import { useStatusContracts, useStoreAccount } from '@/store'
import { TokenItemInterface } from '@/ts/interfaces'
import { formatEther } from 'ethers/lib/utils.js'
import dynamic from 'next/dynamic'
import React from 'react'
import TokenBalance from './TokenBalance'
import TokenLabel from './TokenLabel'

const RewardBalance = dynamic(() => import('./RewardBalance'))
const LendBalance = dynamic(() => import('./LendBalance'))

const TokenItem = ({ token }: TokenItemInterface) => {
  const { name, symbol, img, id } = token
  const { getBalance, getPrice } = useBalance()
  const { isConnected } = useStoreAccount()
  const { loadingBonding } = useStatusContracts()

  const balance = getBalance(id, symbol)
  const price = getPrice(id)
  const formatBalance = formatEther(balance)
  const formatPrice = formatEther(price)
  const rewardList = ['wrapped', 'token', 'otoken']
  const isVtoken = id === 'vtoken'
  return (
    <li className='item-custom'>
      <div className='flex flex-col gap-3 w-full md:flex-row lg:flex-row md:gap-4 lg:gap-5'>
        <TokenLabel name={name} symbol={symbol} img={img} id={id} />
        {isConnected && !loadingBonding && rewardList.includes(id) && <RewardBalance id={id} />}
        {isConnected && !loadingBonding && isVtoken && <LendBalance />}
      </div>
      <TokenBalance amount={formatBalance} price={formatPrice} />
    </li>
  )
}

export default TokenItem
