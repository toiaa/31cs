import Button from '@/components/Button'
import useNotification from '@/hooks/useNotification'
import useTransaction from '@/hooks/useTransaction'
import { useStoreAccount } from '@/store'
import { setGaugeCardsData } from '@/store/methods'
import { FarmCardFooterInterface } from '@/ts/interfaces'
import { ToastMessageType, TransactionType } from '@/ts/types'
import { ACTIONS_FARM_CARD } from '@/utils/constants'
import { approvePlugin, depositInPlugin, getFarmsData, withdrawToPlugin } from '@/utils/farmsMethods'
import { checkAllowance } from '@/utils/web3Methods'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'

function FarmCardFooter({
  underlyingAddress,
  value,
  isAlive,
  plugin,
  action,
  symbol,
  cancelAction,
  isActionSelected,
  handleSelectAction,
  onTransaction,
  isInsuficient,
}: FarmCardFooterInterface) {
  const actionValue = parseEther(value)
  const { chainId, address, isConnected } = useStoreAccount()
  const [isLoading, setIsLoading] = useState(false)
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()
  const isButtonDisabled = !isConnected || !isAlive || isInsuficient
  const message: ToastMessageType = {
    pending: `${action} ${symbol} in progress`,
    success: `${action} ${symbol} success`,
    error: `Error on ${action} ${symbol} `,
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

  const onAllowanceAndApprove = async (underlyingAddress: string, plugin: string, amount: BigNumber) => {
    const allowance = await checkAllowance(underlyingAddress, address, plugin)
    if (allowance.lt(amount)) {
      handleSelectAction(ACTIONS_FARM_CARD.APPROVE)
      onTransaction(true)
      updateTxStatus('txPrepared')
      const { error, tx } = await approvePlugin(underlyingAddress, plugin, amount)
      const messageApprove: ToastMessageType = {
        pending: `Approving ${symbol}`,
        success: `Approve ${symbol} success`,
        error: `Error on Approve ${symbol} failed`,
      }
      await awaitTransaction(tx, error, messageApprove, true)
    }
  }
  const depositTokens = async () => {
    try {
      const allowance = await checkAllowance(underlyingAddress, address, plugin)
      if (allowance.lt(actionValue)) {
        await onAllowanceAndApprove(underlyingAddress, plugin, actionValue)
      }
      handleSelectAction(ACTIONS_FARM_CARD.DEPOSIT)
      onTransaction(true)
      updateTxStatus('txPrepared')
      const { tx, error } = await depositInPlugin(plugin, actionValue, address)
      await awaitTransaction(tx, error, message)
      const data = await getFarmsData(address, chainId)
      setGaugeCardsData(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
  const withdrawTokens = async () => {
    try {
      handleSelectAction(ACTIONS_FARM_CARD.WITHDRAW)
      setIsLoading(true)
      onTransaction(true)
      updateTxStatus('txPrepared')
      const { tx, error } = await withdrawToPlugin(plugin, actionValue, address)
      await awaitTransaction(tx, error, message)
      const data = await getFarmsData(address, chainId)
      setGaugeCardsData(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleActionFarms = () => {
    if (isActionSelected) setIsLoading(true)
    if (!isActionSelected) handleSelectAction(ACTIONS_FARM_CARD.DEPOSIT)
    try {
      if (action === 'Deposit' || action === 'Approve') {
        depositTokens()
      }
      if (action === 'Withdraw') {
        withdrawTokens()
      }
    } catch (error) {
      return { error }
    }
  }
  return (
    <section className='flex w-full items-end gap-2'>
      <Button
        notMinW
        isSecondary
        isFull
        onClick={() => {
          if (isActionSelected) cancelAction()
        }}>
        {isActionSelected ? 'Cancel' : 'Get'}
      </Button>

      <Button notMinW isLoading={isLoading} onClick={() => handleActionFarms()} isFull isDisabled={isButtonDisabled}>
        {isActionSelected && action != 'Claim' ? action.toLowerCase() : 'Deposit'}
      </Button>
    </section>
  )
}

export default FarmCardFooter
