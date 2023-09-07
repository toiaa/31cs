import { useStoreBribes } from '@/store'
import dynamic from 'next/dynamic'
import CardStats from './CardStats'

const VoteList = dynamic(() => import('./VoteList/VoteList'), {
  ssr: false,
})

const BottomSection = () => {
  const { bribes } = useStoreBribes()

  return (
    <div className='vote-card-custom'>
      <CardStats />
      {bribes.length > 0 && <VoteList />}
    </div>
  )
}

export default BottomSection
