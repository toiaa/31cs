import { useStoreRewards } from '@/store'
import { RewardInterface } from '@/ts/interfaces'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'
import Amount from '../Amount'

const RewardBalance = ({ id }: RewardInterface) => {
  const rewards = useStoreRewards()
  const reward = rewards[id] as BigNumber
  const formatReward = formatEther(reward)
  return (
    <div className='flex gap-1 items-center justify-center'>
      <p className='font-semibold text-sm text-center'>Earned</p>
      <Amount amount={formatReward} type='number' decimals={4} />
    </div>
  )
}

export default RewardBalance
