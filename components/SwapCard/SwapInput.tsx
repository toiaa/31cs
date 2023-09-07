import { InputInterface } from '@/ts/interfaces'
import React from 'react'

const SwapInput = ({ value, onInput, isDisabled, type = 'number', maxW, textCenter }: InputInterface) => {
  const stringDecorator = (): string => {
    if (type === 'percentage') return '%'
    if (type === 'price') return '$'
    return ''
  }

  return (
    <div className={`relative ${maxW && 'max-w-[100px] m-auto'}`}>
      <input
        disabled={isDisabled}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        className={`${
          textCenter && 'text-center'
        } bg-transparent text-bold h-[35px] text-sm md:text-lg rounded-lg w-full p-2 outline-none border-2 border-gray-borders focus:border-button-main-darkest transition-ease`}
        placeholder='0'
        type='text'
      />
      {type !== 'number' && (
        <span className='absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none'>
          {stringDecorator()}
        </span>
      )}
    </div>
  )
}

export default SwapInput
