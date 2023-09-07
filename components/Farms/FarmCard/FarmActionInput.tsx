import { InputInterface } from '@/ts/interfaces'
import React from 'react'

const FarmActionInput = ({ value, onInput, isDisabled }: InputInterface) => {
  return (
    <input
      disabled={isDisabled}
      value={value}
      onChange={(e) => onInput(e.target.value)}
      className='bg-transparent text-bold h-[35px] text-[18px] flex-1 rounded-lg w-full p-2 outline-none border border-gray-borders focus:border-button-main-darkest transition-ease'
      placeholder='0'
      type='text'
    />
  )
}

export default FarmActionInput
