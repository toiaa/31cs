import { useStoreStats } from '@/store'
import { StatsDataInterface } from '@/ts/interfaces'
import { formatEther } from 'ethers/lib/utils'
import Amount from '../Amount'

const StatData = ({ label, type, id, isLoading }: StatsDataInterface) => {
  const store = useStoreStats()
  const amount = store[id]
  const formatAmount = formatEther(amount)
  return (
    <div className='flex-center flex-col p-3'>
      <h3 className='text-center font-semibold'>{label}</h3>
      <div className='flex items-center gap-1'>
        <Amount amount={formatAmount} isLoading={isLoading} color='#9CA3AF' type={type} />
        {id === 'emission' && <p className='text-[#9CA3AF] text-xs'>OTOKEN</p>}
      </div>
    </div>
  )
}

export default StatData
