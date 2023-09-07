import Amount from '@/components/Amount'
import TooltipQuestion from '@/components/TooltipQuestion'
import { FarmsStatsInterface } from '@/ts/interfaces'
import { formatUnits } from 'ethers/lib/utils'
import React from 'react'

function FarmStats({ rewardPerToken, rewardPerTokenUSD, stakedTokens, votingWeight }: FarmsStatsInterface) {
  const formatRewardPerToken = formatUnits(rewardPerToken, 18)
  const formatRewardPerTokenUSD = formatUnits(rewardPerTokenUSD, 18)

  const formatStakedTokens = formatUnits(stakedTokens, 18)
  const formatVotingWeight = formatUnits(votingWeight, 18)

  return (
    <section className='flex flex-col gap-2'>
      <div className='farm-card-items-custom flex-col items-center gap-2 w-full'>
        <p className='text-gray-subtitle'>Weekly Reward/Token Deposit</p>
        <div className='flex gap-1 items-center'>
          <Amount amount={formatRewardPerToken} type='number' />
          <p className='text-sm'>oTOKEN</p>
          <div className='flex text-sm'>
            <span>{'('}</span>
            <Amount amount={formatRewardPerTokenUSD} type='price' />
            <span>{')'}</span>
          </div>
        </div>
      </div>
      <div className='farm-card-items-custom flex-col gap-2'>
        <div className='flex justify-between rounded-md w-full'>
          <p className='text-gray-subtitle'>Staked tokens</p>
          <Amount amount={formatStakedTokens} type='number' />
        </div>
        <div className='flex justify-between rounded-md w-full'>
          <div className='flex items-center gap-1'>
            <p className='text-gray-subtitle'>Voting weight</p>
            <TooltipQuestion text='Global emission distribution.' />
          </div>
          <Amount amount={formatVotingWeight} type='percentage' />
        </div>
      </div>
    </section>
  )
}

export default FarmStats
