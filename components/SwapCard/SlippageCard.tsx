import useSetting from '@/hooks/useSetting'
import { useStoreAction, useStoreStats } from '@/store'
import { formatEther } from 'ethers/lib/utils'
import Amount from '../Amount'
import TooltipQuestion from '../TooltipQuestion'

const SlippageCard = () => {
  const { slippage, slippageToletance } = useSetting()
  const { maxMarketSell } = useStoreStats()
  const { minAmount, isBuy, autoMinOutput } = useStoreAction()
  const tokenSymbol = isBuy ? 'TOKEN' : 'WETH'
  const formatMinAmount = formatEther(minAmount)
  const formatautoMinOutput = formatEther(autoMinOutput)
  const formatMaxMarketSell = formatEther(maxMarketSell)
  const slippageValue = slippage.id === 2 ? (Number(slippageToletance) + 1).toString() : slippage.value
  const minOutputValue = slippage.id === 2 ? formatautoMinOutput : formatMinAmount

  return (
    <div className='text-gray item-custom flex-col text-sm'>
      <div className='w-full flex justify-between items-center'>
        <p>{'Losses (0.3% fee + slippage)'}</p>
        <Amount amount={slippageToletance} type='percentage' />
      </div>
      <div className='w-full flex justify-between items-center'>
        <p>Loss Tolerance</p>
        <Amount amount={slippageValue} type='percentage' decimals={4} />
      </div>
      <div className='w-full flex justify-between items-center'>
        <p>Minimum Output</p>
        <div className='flex gap-1 items-center'>
          <Amount amount={minOutputValue} type='number' decimals={4} />
          <p className='text-white'>{tokenSymbol}</p>
        </div>
      </div>
      {!isBuy && (
        <div className='w-full flex justify-between items-center'>
          <p>Max Sell Avaiable</p>
          <div className='flex gap-1 items-center'>
            <TooltipQuestion text='Max TOKEN that can be sold at market, the rest must be Redeemed in Options' />
            <Amount amount={formatMaxMarketSell} type='number' decimals={4} />
            <p className='text-white'>TOKEN</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SlippageCard
