import Amount from '@/components/Amount'
import { useStatusContracts } from '@/store'

interface VoteStateRowInterface {
  label: string
  amount: string
}

const VoteStateRow = ({ label, amount }: VoteStateRowInterface) => {
  const { loadingVote } = useStatusContracts()
  return (
    <div className='flex justify-between'>
      <p className='font-bold'>{label}</p>
      <Amount amount={amount} type='number' decimals={4} isLoading={loadingVote} />
    </div>
  )
}

export default VoteStateRow
