import Amount from '@/components/Amount'
import { RewardVoteI } from '@/ts/interfaces'

const RewardVote = ({ amount, symbol }: RewardVoteI) => {
  return (
    <div className='w-full flex justify-center items-center gap-1'>
      <Amount amount={amount} type='number' />
      <p>{symbol}</p>
    </div>
  )
}

export default RewardVote
