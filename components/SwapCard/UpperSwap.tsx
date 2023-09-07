import { useStatusContracts } from '@/store'
import { ContainertopSwapInterface } from '@/ts/interfaces'
import React from 'react'
import { AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai'
import TokenAmountCard from './TokenAmountCard'

const UpperSwap = ({ currentTokens, currentAction, currentOption }: ContainertopSwapInterface) => {
  const [inputToken, outputToken, craftToken] = currentTokens
  const { loadingBonding } = useStatusContracts()
  const showCraft = currentOption === 'Exercise'
  const showLend = currentAction !== 'Lend'

  return (
    <div className='w-full flex flex-col items-center justify-start gap-2'>
      <TokenAmountCard
        token={inputToken}
        inputKey='inputValue'
        inputToken={inputToken}
        currentAction={currentAction}
        currentOption={currentOption}
        showPercentage
        isLoading={loadingBonding}
      />
      {showCraft && (
        <>
          <AiOutlinePlus color='#fef5ca' size={30} />
          <TokenAmountCard
            token={craftToken}
            inputToken={inputToken}
            inputKey='craftValue'
            currentAction={currentAction}
            currentOption={currentOption}
          />
        </>
      )}
      {showLend && (
        <>
          <AiOutlineArrowDown color='#fef5ca' size={30} />
          <TokenAmountCard
            token={outputToken}
            inputToken={inputToken}
            inputKey='outputValue'
            currentAction={currentAction}
            currentOption={currentOption}
            isLoading={loadingBonding}
          />
        </>
      )}
    </div>
  )
}

export default UpperSwap
