import Amount from '@/components/Amount'
import useInput from '@/hooks/useInput'
import useTransaction from '@/hooks/useTransaction'
import { useStoreAction } from '@/store'
import { InfoTransactionInterface } from '@/ts/interfaces'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'

const Information = ({ isFarm, value, actionSelectedFarms, rewards }: InfoTransactionInterface) => {
  const { txError, txSuccess } = useTransaction()
  const { actionSelected, tokens } = useStoreAction()
  const { getValue } = useInput()
  const inputValue = getValue('inputValue')
  const outputValue = getValue('outputValue')

  const renderDataInfo = () => {
    if (isFarm && value) {
      if (actionSelectedFarms === 'Claim' && rewards) {
        const rewardsString = formatEther(rewards)
        return (
          <div className='flex w-full justify-between'>
            {!(txSuccess || txError) && <p>{`${actionSelectedFarms} amount:`}</p>}
            {!(txSuccess || txError) && <Amount amount={rewardsString} type='number' decimals={4} />}
          </div>
        )
      }
      return (
        <div className='flex w-full justify-between'>
          <p>{`${actionSelectedFarms} amount:`}</p>
          <Amount amount={value} type='number' decimals={4} />
        </div>
      )
    }
    return (
      <>
        <div className='flex w-full justify-between'>
          <p>Token from:</p>
          <p>{tokens?.inputToken.symbol}</p>
        </div>
        <div className='flex w-full justify-between'>
          <p>Token To:</p>
          <p>{tokens?.outputToken.symbol}</p>
        </div>
        <div className='flex w-full justify-between'>
          <p>{`${actionSelected} amount sent:`}</p>
          <Amount amount={inputValue} type='number' decimals={4} />
        </div>
        <div className='flex w-full justify-between'>
          <p>{`${actionSelected} amount expected to receive:`}</p>
          <Amount amount={outputValue} type='number' decimals={4} />
        </div>
      </>
    )
  }
  return <div className='flex flex-col divide-y w-full gap-2'>{renderDataInfo()}</div>
}

export default Information
