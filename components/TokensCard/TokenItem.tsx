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
  const balance = getBalance(id)
  const price = getPrice(id)
  const formatBalance = formatEther(balance)
  const formatPrice = formatEther(price)
  const rewardList = ['wrapped', 'token', 'otoken']
  const isVtoken = id === 'vtoken'
  return (
    <li className='item-custom-token items-center border-transparent transition-ease'>
      <div className='flex gap-2 w-full items-start md:flex-row lg:flex-row'>
        <TokenLabel name={name} symbol={symbol} img={img} id={id} />
        <TokenBalance amount={formatBalance} price={formatPrice} />
      </div>

      {isConnected && !loadingBonding && rewardList.includes(id) && <RewardBalance id={id} />}
      {isConnected && !loadingBonding && isVtoken && <LendBalance />}
    </li>
  )
}

export default TokenItem
