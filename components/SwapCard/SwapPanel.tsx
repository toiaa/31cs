import { useStoreAccountStats, useStoreBalance, useStoreSwap } from '@/store'
import { SwapPanelInterface } from '@/ts/interfaces'
import { ERRORS } from '@/utils/constants'
import React from 'react'
import ErrorMessage from '../ErrorMessage'
import BottomSwap from './BottomSwap'
import UpperSwap from './UpperSwap'

const SwapPanel = ({ currentOption, currentTokens, currentAction, onTransactionStatus }: SwapPanelInterface) => {
  const showSlippage = ['Buy', 'Sell'].includes(currentOption)
  const { accountMaxWidthdraw } = useStoreAccountStats()
  const { vtoken } = useStoreBalance()

  const { message } = useStoreSwap()
  const getErrorMessage = () => {
    if (currentOption === 'Unstake' && accountMaxWidthdraw.isZero() && !vtoken.isZero()) return ERRORS.unstake
    return message
  }

  return (
    <div className='w-full flex flex-col items-center h-full justify-between gap-2'>
      <UpperSwap
        onTransactionStatus={onTransactionStatus}
        currentOption={currentOption}
        currentAction={currentAction}
        currentTokens={currentTokens}
      />
      <ErrorMessage error={getErrorMessage()} />
      <div className='flex flex-col justify-end w-full items-center'>
        <BottomSwap
          onTransactionStatus={onTransactionStatus}
          currentOption={currentOption}
          showSlippage={showSlippage}
        />
      </div>
    </div>
  )
}

export default SwapPanel
