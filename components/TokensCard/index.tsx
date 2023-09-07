import { useStoreAccount } from '@/store'
import { TOKENS } from '@/utils/tokens'
import HarvestButton from '../WebButtons/HarvestAction'
import PortfolioData from './PortfolioData'
import TokenItem from './TokenItem'

const TokensCard = () => {
  const { chainId } = useStoreAccount()
  const { WRAPPED, OTOKEN, TOKEN, VTOKEN } = TOKENS[chainId]

  return (
    <div className='card-custom flex flex-col items-center justify-between gap-5'>
      <PortfolioData />
      <div className='flex flex-col gap-3 w-full h-full'>
        <TokenItem key={`${VTOKEN.symbol}-item`} token={VTOKEN} />
        <TokenItem key={`${OTOKEN.symbol}-item`} token={OTOKEN} />
        <TokenItem key={`${TOKEN.symbol}-item`} token={TOKEN} />
        <TokenItem key={`${WRAPPED.symbol}-item`} token={WRAPPED} />
      </div>
      <HarvestButton />
    </div>
  )
}

export default TokensCard
