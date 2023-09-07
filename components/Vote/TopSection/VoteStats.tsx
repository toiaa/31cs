import { useStoreAccountStats } from '@/store'
import { formatEther } from 'ethers/lib/utils'
import VoteStateRow from './VoteStateRow'

const VoteStats = () => {
  const { accountVotingPower } = useStoreAccountStats()
  const votingPowerBalanceFormatted = formatEther(accountVotingPower)

  return (
    <div className='flex flex-col gap-2 w-full bg-box p-4 rounded-lg'>
      <VoteStateRow label='Voting Power' amount={votingPowerBalanceFormatted} />
    </div>
  )
}

export default VoteStats
