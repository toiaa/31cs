import useBalance from '@/hooks/useBalance'
import useInput from '@/hooks/useInput'
import { useStoreAccountStats } from '@/store'
import { getStatus } from '@/store/methods'
import { DetailAmountInterface, TokenAmountCardInterface } from '@/ts/interfaces'
import { TokenType } from '@/ts/types'
import { calculateAmountUSD, formatInputValue, isInputDisabled } from '@/utils/methods'
import { formatEther } from 'ethers/lib/utils'
import React, { useCallback, useMemo } from 'react'
import DetailAmount from './DetailAmount'
import SwapInput from './SwapInput'
import TokenInfoSection from './TokenInfoSection'

const TokenAmountCard = ({
  token,

  inputKey,
  currentAction,
  currentOption,
  items,
  isLoading = false,
  inputToken,
}: TokenAmountCardInterface) => {
  const { symbol, img, id } = token
  const { id: inputId } = inputToken
  const { getBalance, getPrice } = useBalance()
  const { accountMaxWidthdraw, accountVotingPower } = useStoreAccountStats()
  const { setValue, getValue } = useInput(currentAction, currentOption, inputKey)
  const value = getValue(inputKey)
  const balance = getBalance(id)
  const inputBalance = getBalance(inputId)
  const price = getPrice(id)
  const formatBalance = formatEther(balance)
  const formatVotingPower = formatEther(accountVotingPower)
  const formatMaxWithdraw = formatEther(accountMaxWidthdraw)
  const showMaxWithdraw = currentOption === 'Unstake' && inputKey === 'inputValue'
  const formatPrice = formatEther(price)
  const isDisabled = isInputDisabled(currentAction, inputKey)
  const amountUSD = useMemo(() => calculateAmountUSD(value, formatPrice), [value, formatPrice])
  const showUsdPrice = ['Wrap', 'Lend'].includes(currentAction) || currentOption === 'Stake'
  const showLend = useMemo(() => currentAction === 'Lend', [currentAction])
  const lendLabel: TokenType = currentOption === 'Borrow' ? 'credit' : 'debt'
  const lendBalance = getBalance(lendLabel)
  const formatLendBalance = formatEther(lendBalance)

  const handleInput = useCallback(
    async (typeValue: string) => {
      const newValue = formatInputValue(typeValue, value)
      if (newValue !== value) {
        getStatus(newValue, showLend ? lendBalance : inputBalance, showLend ? lendLabel : 'balance')
        setValue(currentAction, currentOption, inputKey, newValue)
      }
    },
    [currentAction, currentOption, inputKey, value, lendBalance, inputBalance, setValue, showLend, lendLabel],
  )

  const detailAmount: DetailAmountInterface = {
    amount: formatBalance,
    label: 'Balance',
    type: 'number',
  }
  const detailMaxWithdraw: DetailAmountInterface = {
    amount: formatMaxWithdraw,
    label: 'Max',
    type: 'number',
  }
  const detailVotingPower: DetailAmountInterface = {
    amount: formatVotingPower,
    label: 'Current',
    type: 'number',
  }
  const detailLendAmount: DetailAmountInterface = {
    amount: formatLendBalance,
    label: lendLabel,
    type: 'number',
  }

  return (
    <div className='w-full flex flex-col px-5 py-3 rounded-lg gap-4'>
      <div className='w-full flex flex-col justify-between'>
        <TokenInfoSection
          items={items}
          img={img}
          symbol={symbol}
          detailAmountProps={[detailAmount, detailMaxWithdraw, detailVotingPower, detailLendAmount]}
          showLend={showLend}
          showMaxWithdraw={showMaxWithdraw}
          isLoading={isLoading}
          onMax={handleInput}
        />
        <div className='flex flex-col gap-1 w-full bg-card-neutral rounded p-2 justify-between h-[75px]'>
          <SwapInput value={value} isDisabled={isDisabled} onInput={handleInput} />
          {!showUsdPrice && <DetailAmount amount={amountUSD} label='≈' type='price' isLoading={isLoading} />}
        </div>
      </div>
    </div>
  )
}

export default TokenAmountCard
