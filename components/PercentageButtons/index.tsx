import { PercentageInterface } from '@/ts/interfaces'
import { PERCENTAGES_SWAP } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from 'ethers/lib/utils'
import React, { memo } from 'react'

const PercentageButtons = ({ handleInput, balance }: PercentageInterface) => {
  const handlePercentage = (percentage: number) => {
    const percentageBigNumber = BigNumber.from(percentage)
    const valueToFormat = balance.mul(percentageBigNumber).div(100)
    const valueFormatted = formatEther(valueToFormat)
    handleInput(valueFormatted)
  }

  return (
    <ul className='flex-center text-sm bg-transparent gap-1 w-full '>
      {PERCENTAGES_SWAP.map((percentage, index) => {
        return (
          <li
            onClick={() => handlePercentage(percentage.value)}
            key={index}
            className='text-center bg-button-main-darkest bg-opacity-50 text-main-400 rounded p-1 w-64 hover:opacity-40 transition-ease cursor-pointer'>
            {percentage.label}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(PercentageButtons)
