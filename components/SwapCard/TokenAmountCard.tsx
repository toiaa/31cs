import useBalance from '@/hooks/useBalance'
import useInput from '@/hooks/useInput'
import { useStoreAccountStats } from '@/store'
import { getStatus } from '@/store/methods'
import { DetailAmountInterface, TokenAmountCardInterface } from '@/ts/interfaces'
import { TokenType } from '@/ts/types'
import { calculateAmountUSD, formatInputValue, isInputDisabled } from '@/utils/methods'
import { formatEther } from 'ethers/lib/utils'
import dynamic from 'next/dynamic'
import React, { useCallback, useMemo } from 'react'
import DetailAmount from './DetailAmount'
import SwapInput from './SwapInput'
import TokenInfoSection from './TokenInfoSection'

const PercentageButtons = dynamic(() => import('@/components/PercentageButtons'))
const TokensModal = dynamic(() => import('../TokensModal'))

const TokenAmountCard = ({
  token,
  showPercentage,
  inputKey,
  currentAction,
  currentOption,
  showTokenList,
  onSelectItem,
  onOpenList,
  items,
  isLoading = false,
  inputToken,
}: TokenAmountCardInterface) => {
  const { symbol, img, id } = token
  const { symbol: inputSymbol, id: inputId } = inputToken
  const { getBalance, getPrice } = useBalance()
  const { accountMaxWidthdraw, accountVotingPower } = useStoreAccountStats()
  const { setValue, getValue } = useInput(currentAction, currentOption, inputKey)
  const value = getValue(inputKey)
  const balance = getBalance(id, symbol)
  const inputBalance = getBalance(inputId, inputSymbol)
  const price = getPrice(id)
  const formatBalance = formatEther(balance)
  const formatVotingPower = formatEther(accountVotingPower)
  const formatMaxWithdraw = formatEther(accountMaxWidthdraw)
  const showMaxWithdraw = currentOption === 'Unstake' && inputKey === 'inputValue'
  const formatPrice = formatEther(price)
  const isDisabled = isInputDisabled(currentAction, inputKey)
  const amountUSD = useMemo(() => calculateAmountUSD(value, formatPrice), [value, formatPrice])
  const showUsdPrice = ['Wrap', 'Lend', 'Bribe'].includes(currentAction) || currentOption === 'Stake'
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

  const onOpenBribe = () => {
    if (onOpenList) onOpenList()
  }

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
    <div className='w-full flex flex-col px-5 py-3 bg-box-dark-neutral rounded-lg gap-4'>
      <div className='w-full flex justify-between'>
        <div className='flex flex-col gap-1 w-full justify-between h-[68px]'>
          <SwapInput value={value} isDisabled={isDisabled} onInput={handleInput} />
          {!showUsdPrice && <DetailAmount amount={amountUSD} label='≈' type='price' isLoading={isLoading} />}
        </div>
        <TokenInfoSection
          onOpenBribe={onOpenBribe}
          items={items}
          img={img}
          symbol={symbol}
          detailAmountProps={[detailAmount, detailMaxWithdraw, detailVotingPower, detailLendAmount]}
          showLend={showLend}
          showMaxWithdraw={showMaxWithdraw}
          isLoading={isLoading}
        />
      </div>
      {showPercentage && <PercentageButtons handleInput={handleInput} balance={showLend ? lendBalance : balance} />}
      {showTokenList && onSelectItem && items && (
        <TokensModal onClose={() => null} items={items} onSelectItem={onSelectItem} type='toke' />
      )}
    </div>
  )
}

export default TokenAmountCard
