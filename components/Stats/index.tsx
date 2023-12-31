import { StatsInterface } from '@/ts/interfaces'
import { STATS_DATA } from '@/utils/constants'
import StatData from './StatData'

const Stats = ({ isLoading }: StatsInterface) => {
  return (
    <section className='grid grid-cols-3 md:grid-cols-6 w-full bg-box rounded-lg'>
      {STATS_DATA.map(({ label, type, id }) => (
        <StatData key={`${label}-stat`} label={label} id={id} isLoading={isLoading} type={type} />
      ))}
    </section>
  )
}

export default Stats
