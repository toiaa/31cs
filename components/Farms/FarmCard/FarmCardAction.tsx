import { FarmCardActionInterface } from '@/ts/interfaces'
import { formatUnits, parseEther } from 'ethers/lib/utils'
import dynamic from 'next/dynamic'
import FarmCardFooter from './FarmCardFooter'

const FarmActionInput = dynamic(() => import('./FarmActionInput'), {
  ssr: false,
})
const PercentageButtons = dynamic(() => import('@/components/PercentageButtons'), {
  ssr: false,
})
const Amount = dynamic(() => import('@/components/Amount'), {
  ssr: false,
})

function FarmCardAction({
  underlyingAddress,
  isAlive,
  plugin,
  action,
  symbol,
  balance,
  cancelAction,
  handleSelectAction,
  isActionSelected,
  handleInput,
  value,
  onTransaction,
}: FarmCardActionInterface) {
  const actionBalanceBigNumber = balance[action]

  const isInsuficientBalance = actionBalanceBigNumber
    ? actionBalanceBigNumber.lt(parseEther(value)) || parseEther(value).lte(parseEther('0'))
    : false

  const actionBalance = actionBalanceBigNumber ? formatUnits(actionBalanceBigNumber, 18) : '0'

  return (
    <div className='h-fit'>
      {isActionSelected && action != 'Claim' && (
        <section>
          <p className='text-gray-subtitle'>
            <span className='capitalize'>{action.toLowerCase()} </span>tokens
          </p>
          <div className='flex flex-col farm-card-items-custom'>
            <div>
              <FarmActionInput value={value} isDisabled={false} onInput={handleInput} />
              <div className='flex justify-end items-center p-2'>
                <div className='flex gap-1 items-center'>
                  Balance: <Amount amount={actionBalance} decimals={2} type='number' />
                </div>
              </div>
            </div>
            <PercentageButtons handleInput={handleInput} balance={actionBalanceBigNumber} />
          </div>
        </section>
      )}
      <FarmCardFooter
        isAlive={isAlive}
        isInsuficient={isInsuficientBalance}
        underlyingAddress={underlyingAddress}
        symbol={symbol}
        onTransaction={onTransaction}
        plugin={plugin}
        value={value}
        cancelAction={cancelAction}
        action={action}
        handleSelectAction={handleSelectAction}
        isActionSelected={isActionSelected}
      />
    </div>
  )
}

export default FarmCardAction
