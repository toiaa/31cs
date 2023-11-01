import { useStatusContracts } from '@/store'
import { ContainertopSwapInterface } from '@/ts/interfaces'
import { InputType, Token } from '@/ts/types'
import React from 'react'
import { AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai'
import TokenAmountCard from './TokenAmountCard'

const UpperSwap = ({ currentTokens, currentAction, currentOption }: ContainertopSwapInterface) => {
  const [inputToken, outputToken, craftToken] = currentTokens
  const { loadingBonding } = useStatusContracts()
  const showCraft = currentOption === 'Exercise'
  const showLend = currentAction !== 'Lend'
  const isRedeem = currentOption === 'Redeem'

  const renderTokenAmountCard = (token: Token, inputKey: InputType) => (
    <TokenAmountCard
      token={token}
      inputKey={inputKey}
      inputToken={inputToken}
      currentAction={currentAction}
      currentOption={currentOption}
      isLoading={loadingBonding}
    />
  )
  return (
    <div className='w-full flex flex-col items-center justify-start gap-2'>
      {renderTokenAmountCard(inputToken, 'inputValue')}
      {showCraft && (
        <>
          <AiOutlinePlus color='#fef5ca' size={30} />
          {renderTokenAmountCard(craftToken, 'craftValue')}
        </>
      )}
      {isRedeem && (
        <>
          <AiOutlineArrowDown color='#fef5ca' size={30} />
          {renderTokenAmountCard(craftToken, 'craftValue')}
        </>
      )}
      {showLend && !isRedeem && (
        <>
          <AiOutlineArrowDown color='#fef5ca' size={30} />
          {renderTokenAmountCard(outputToken, 'outputValue')}
        </>
      )}
    </div>
  )
}

export default UpperSwap
