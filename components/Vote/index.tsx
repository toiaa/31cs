import useGetBribeCards from '@/hooks/useGetBribeCards'
import dynamic from 'next/dynamic'
import SquareLoader from '../Loader/SquareLoader'
import TopSection from './TopSection'

const BottomSection = dynamic(() => import('./BottomSection'), {
  ssr: false,
})

const VoteSection = () => {
  const { isLoading: isLoadingBribes } = useGetBribeCards()

  return (
    <section className='flex flex-col gap-4'>
      <TopSection />
      {isLoadingBribes ? (
        <div className='w-full flex flex-col items-center gap-10'>
          <h1 className='text-xl font-bold'>Fetching Votes</h1>
          <SquareLoader />
        </div>
      ) : (
        <BottomSection />
      )}
    </section>
  )
}

export default VoteSection
