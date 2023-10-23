import { Token } from '@/ts/types'
import { POLYGON } from '@/utils/constants'
import { TOKENS_ARRAY } from '@/utils/tokens'
import MintButton from '../MintButton'

const MintGroup = ({ list, label }: { list: Token[]; label: string }) => (
  <div className='flex flex-col gap-1'>
    <h2 className='font-semibold text-lg'>{label}</h2>
    <div className='flex justify-start gap-1 flex-wrap'>
      {list.map((token) => (
        <MintButton key={`${token.address}-${token.symbol}`} token={token} />
      ))}
    </div>
  </div>
)

const MintsButtons = () => {
  return (
    <div className='flex flex-col gap-1'>
      <MintGroup label='Mint tokens to test Home and Vote' list={TOKENS_ARRAY[POLYGON]} />
    </div>
  )
}
export default MintsButtons
