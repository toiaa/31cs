import Amount from '@/components/Amount'
import { useStoreAccount } from '@/store'
import { BribeCardI } from '@/ts/interfaces'
import { findRewardTokens } from '@/utils/methods'
import { formatEther } from 'ethers/lib/utils'
import RewardSection from './RewardSection'
import VoteInput from './VoteInput'
import VoteToken from './VoteToken'

const ListRow = ({
  bribe,
  updateVotes,
}: {
  bribe: BribeCardI
  updateVotes: (address: string, value: string) => void
}) => {
  const {
    symbol,
    protocol,
    voteWeight,
    votePercent,
    accountVotePercent,
    rewardTokenDecimals,
    rewardTokens,
    rewardsPerToken,
    accountRewardsEarned,
    pluginAddress,
  } = bribe

  const { chainId } = useStoreAccount.getState()

  const formatVotePercent = formatEther(votePercent)
  const formatVoteWeight = formatEther(voteWeight)
  const formatAccountVote = formatEther(accountVotePercent)

  return (
    <div className='w-full flex items-center bg-box-dark-neutral rounded-lg py-1 px-1 md:p-2'>
      <VoteToken symbol={symbol} protocol={protocol} />
      <div className='w-full flex flex-col sm:flex-row  justify-evenly text-center font-normal text-sm md:text-base'>
        <Amount type='percentage' amount={formatVotePercent} />
        <Amount type='number' amount={formatVoteWeight} decimals={4} />
      </div>
      <RewardSection
        rewardTokenDecimals={rewardTokenDecimals}
        rewardTokens={findRewardTokens(chainId, rewardTokens)}
        rewardsPerToken={rewardsPerToken}
      />
      <RewardSection
        rewardTokenDecimals={rewardTokenDecimals}
        rewardTokens={findRewardTokens(chainId, rewardTokens)}
        rewardsPerToken={accountRewardsEarned}
      />
      <div className='flex flex-col w-full items-center'>
        <div className='flex items-center gap-1'>
          <Amount type='number' amount={formatAccountVote} weight='semibold' />
          <p className='text-gray-subtitle font-semibold'>Votes</p>
        </div>
        <VoteInput pluginAddress={pluginAddress} updateVotes={updateVotes} />
      </div>
    </div>
  )
}

export default ListRow
