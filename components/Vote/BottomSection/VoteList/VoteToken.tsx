import ImageTokens from '@/components/ImageTokens'
import { VoteTokenI } from '@/ts/interfaces'

const VoteToken = ({ protocol, symbol }: VoteTokenI) => {
  return (
    <div className='w-full flex flex-col text-left text-sm md:text-base'>
      <h4 className='w-full font-normal'>{protocol}</h4>
      <h4 className='w-full font-semibold'>{symbol}</h4>
      <ImageTokens symbol={symbol} />
    </div>
  )
}

export default VoteToken
