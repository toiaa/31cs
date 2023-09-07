import SwapInput from '@/components/SwapCard/SwapInput'
import { useStoreAccount } from '@/store'
import { VoteInputI } from '@/ts/interfaces'
import { formatInputValue } from '@/utils/methods'
import React, { useState } from 'react'

const VoteInput = ({ pluginAddress, updateVotes }: VoteInputI) => {
  const { isConnected } = useStoreAccount.getState()
  const [inputValue, setInputValue] = useState('0')

  const handleInput = async (typeValue: string) => {
    const newValue = formatInputValue(typeValue, inputValue)
    if (newValue !== inputValue) {
      setInputValue(newValue)
      updateVotes(pluginAddress, newValue)
    }
  }
  return (
    <div className='w-full'>
      <SwapInput type='percentage' value={inputValue} isDisabled={!isConnected} onInput={handleInput} maxW textCenter />
    </div>
  )
}

export default VoteInput
