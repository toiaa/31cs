import useInput from '@/hooks/useInput'
import useNotification from '@/hooks/useNotification'
import { DEFAULT_VALUE, useStoreAccount, useStoreBribes, useStoreSwap, useStoreTokensBalance } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ADDRESS, ToastMessageType, Token } from '@/ts/types'
import { isValid } from '@/utils/methods'
import { approve, checkAllowance, getMulticallbondingVote, notifyRewardAmount } from '@/utils/web3Methods'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import Button from '../Button'

const CreateBribeButton = ({ rewardToken, bribeAddress }: { rewardToken: Token; bribeAddress: ADDRESS }) => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const { isDisabled } = useStoreSwap()
  const [isLoading, setIsLoading] = useState(false)
  const { getValue } = useInput()
  const { pendingToast, errorToast } = useNotification()
  const inputValue = getValue('bribeValue')
  const [allowanceAmount, setAllowanceAmount] = useState<BigNumber>(DEFAULT_VALUE)
  const [textLoading, setTextLoading] = useState<string | null>(null)

  const getButtonStatus = () => {
    if (!isConnected || !whitelistedNetwork) return true
    if (!isValid(inputValue)) return true
    return isDisabled
  }

  const onAllowanceAndApprove = async (token: Token) => {
    const parsedValue = parseEther(inputValue)
    const tokenAddress = token.address as ADDRESS

    const allowance = await checkAllowance(tokenAddress, address, bribeAddress)
    const allowanceBN = BigNumber.from(allowance)
    setAllowanceAmount(allowanceBN)
    if (allowanceBN.lt(parsedValue)) {
      setTextLoading('Approve')
      const { error, tx } = await approve({ contractAddress: tokenAddress, spenderAddress: bribeAddress }, parsedValue)

      const message: ToastMessageType = {
        pending: `Approving ${token.symbol}`,
        success: `Approve ${token.symbol} success`,
        error: `Error on Approve ${token.symbol} failed`,
      }
      if (tx) {
        setTextLoading('Approving')
        pendingToast(tx.hash, tx.wait, message)
        await tx.wait()
        setTextLoading(null)
      }
      if (error) {
        errorToast('error', message.error)
      }
    }
  }

  const onCreateBribe = async () => {
    try {
      const parsedValue = parseEther(inputValue)
      setIsLoading(true)
      if (allowanceAmount.lt(parsedValue)) {
        await onAllowanceAndApprove(rewardToken)
      }
      const message: ToastMessageType = {
        pending: 'Create Bribe in progress',
        success: 'Create Bribe success',
        error: 'Create Bribe failed',
      }
      const contractAddress = rewardToken.address as ADDRESS

      const { tx, error } = await notifyRewardAmount(contractAddress, bribeAddress, parsedValue)
      if (tx) {
        pendingToast(tx.hash, tx.wait, message)
        await tx.wait()
      }
      if (error) errorToast('error', message.error)
      const { bondingCurveData, portfolioData, formatBribes, balances } = await getMulticallbondingVote(
        address,
        chainId,
      )
      useStoreTokensBalance.setState(balances)
      useStoreBribes.setState({ bribes: formatBribes })
      updateBondingCurveData({ bondingCurveData, portfolioData })

      setTextLoading('Creating Bribe')
      setTextLoading('')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setTextLoading('')
    }
  }

  return (
    <Button isDisabled={getButtonStatus()} onClick={onCreateBribe} isLoading={isLoading} textLoading={textLoading}>
      Create Bribe
    </Button>
  )
}

export default CreateBribeButton
