import useInput from '@/hooks/useInput'
import useNotification from '@/hooks/useNotification'
import useSetting from '@/hooks/useSetting'
import useTransaction from '@/hooks/useTransaction'
import { DEFAULT_VALUE, useStoreAccount, useStoreAction, useStoreSwap } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ContainerBottomSwapInterface } from '@/ts/interfaces'
import { ADDRESS, ToastMessageType, Token, TransactionType } from '@/ts/types'
import { getAllowanceInfo, getTokensSwap } from '@/utils/methods'
import { approve, buy_sell, checkAllowance, getMulticallBondingCurveData, swap_action } from '@/utils/web3Methods'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Button from '../Button'

const SlippageCard = dynamic(() => import('./SlippageCard'), {
  ssr: false,
})

const BottomSwap = ({ currentOption, onTransactionStatus }: ContainerBottomSwapInterface) => {
  const { isDisabled } = useStoreSwap()
  const showSlippage = ['Buy', 'Sell'].includes(currentOption)
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const [isLoading, setIsLoading] = useState(false)
  const { getValue } = useInput()
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()
  const inputValue = getValue('inputValue')
  const outputValue = getValue('outputValue')
  const { inputToken, outputToken } = getTokensSwap(currentOption, chainId)
  const { unlimitedApproval } = useSetting()
  const getButtonStatus = () => {
    if (!isConnected || !whitelistedNetwork) return true
    return isDisabled
  }

  const awaitTransaction = async (
    tx: TransactionType | null,
    error: unknown,
    message: ToastMessageType,
    throwError?: boolean,
  ) => {
    if (tx) {
      pendingToast(tx.hash, tx.wait, message)
      updateHash(tx.hash)
      updateTxStatus('txLoading')
      await tx.wait()
      updateTxStatus('txSuccess')
    }
    if (error) {
      errorToast('error', message.error)
      updateTxStatus('txError')
      if (throwError) throw new Error(message.error)
    }
  }

  const onAllowanceAndApprove = async (token: Token, spender: Token, value: string) => {
    const tokenAddress = token.address as ADDRESS
    const spenderAddress = spender.address as ADDRESS
    const allowance = await checkAllowance(tokenAddress, address, spenderAddress)
    const allowanceBN = BigNumber.from(allowance)
    const isUnlimitedApproval = unlimitedApproval.value === 'true'
    const parsedValue = isUnlimitedApproval ? ethers.constants.MaxUint256 : parseEther(value)
    if (allowanceBN.lt(parsedValue)) {
      useStoreAction.setState({ actionSelected: 'Approve', tokens: { inputToken: token, outputToken: spender } })
      onTransactionStatus(true)
      updateTxStatus('txPrepared')
      const { error, tx } = await approve({ contractAddress: tokenAddress, spenderAddress }, parsedValue)
      const message: ToastMessageType = {
        pending: `Approving ${token.symbol}`,
        success: `Approve ${token.symbol} success`,
        error: `Error on Approve ${token.symbol} failed`,
      }
      await awaitTransaction(tx, error, message)
    }
  }

  const handleAction = async () => {
    const parsedValue = parseEther(inputValue)
    if (parsedValue.gt(DEFAULT_VALUE)) {
      setIsLoading(true)
      try {
        const { requestApprove, tokensToApprove, secondTokensToApprove } = getAllowanceInfo(chainId, currentOption)
        if (requestApprove) {
          const { inputToken: tokenA, outputToken: tokenB } = tokensToApprove
          await onAllowanceAndApprove(tokenA, tokenB, inputValue)
          if (secondTokensToApprove) {
            const { inputToken: tokenC, outputToken: tokenD } = secondTokensToApprove
            const craftValue = getValue('craftValue')
            await onAllowanceAndApprove(tokenC, tokenD, craftValue)
          }
        }
        if (['Buy', 'Sell'].includes(currentOption)) {
          useStoreAction.setState({ actionSelected: currentOption, tokens: { inputToken, outputToken } })
          onTransactionStatus(true)
          updateTxStatus('txPrepared')
          const { tx, error } = await buy_sell(parsedValue, currentOption)
          const message: ToastMessageType = {
            pending: `${currentOption} ${inputValue} ${inputToken.symbol} in progress`,
            success: `${currentOption} ${inputValue} ${inputToken.symbol} success`,
            error: `Error on ${currentOption} ${inputToken.symbol}`,
          }
          await awaitTransaction(tx, error, message)
        } else {
          useStoreAction.setState({ actionSelected: currentOption, tokens: { inputToken, outputToken } })
          updateTxStatus('txPrepared')
          const { tx, error } = await swap_action(inputValue, currentOption)
          const symbol = ['Stake', 'Unstake'].includes(currentOption) ? inputToken.symbol : outputToken.symbol
          const message: ToastMessageType = {
            pending: `${currentOption} ${outputValue} ${symbol} in progress`,
            success: `${currentOption} ${outputValue} ${symbol} success`,
            error: `Error on ${currentOption} ${symbol}`,
          }
          await awaitTransaction(tx, error, message)
        }
        const { bondingCurveData, portfolioData } = await getMulticallBondingCurveData(address, chainId)

        updateBondingCurveData({ bondingCurveData, portfolioData })
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-end gap-4'>
      {showSlippage && <SlippageCard />}
      <Button isDisabled={getButtonStatus()} isLoading={isLoading} onClick={handleAction} isFull>
        {currentOption}
      </Button>
    </div>
  )
}

export default BottomSwap
