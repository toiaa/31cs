import { RewardSectionI } from '@/ts/interfaces'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from 'ethers/lib/utils'
import React from 'react'
import RewardVote from './RewardVote'

const RewardSection = ({ rewardTokenDecimals, rewardTokens, rewardsPerToken }: RewardSectionI) => {
  const getAmount = (rewardPerToken: BigNumber, decimals: number): string => {
    const amount = formatUnits(rewardPerToken, decimals)
    return amount
  }

  return (
    <div className='vote-row-rewards'>
      {rewardTokens.map((rt, index) => (
        <RewardVote
          key={`${rt.address}-${index}-tokenVote`}
          symbol={rt.symbol}
          amount={getAmount(rewardsPerToken[index], rewardTokenDecimals[index])}
        />
      ))}
    </div>
  )
}

export default RewardSection
