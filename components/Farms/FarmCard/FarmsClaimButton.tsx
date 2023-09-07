import useNotification from '@/hooks/useNotification'
import useTransaction from '@/hooks/useTransaction'
import { useStoreAccount } from '@/store'
import { setGaugeCardsData } from '@/store/methods'
import { ClaimFarmsInterface } from '@/ts/interfaces'
import { ToastMessageType } from '@/ts/types'
import { ACTIONS_FARM_CARD } from '@/utils/constants'
import { getFarmsData, getGaugeRewards } from '@/utils/farmsMethods'
import { useState } from 'react'
import Button from '../../Button'

const ClaimFarmsButton = ({ gaugeAddress, onTransaction, handleSelectAction, disableClaim }: ClaimFarmsInterface) => {
  const { chainId, address, isConnected } = useStoreAccount()
  const [isLoading, setIsLoading] = useState(false)
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()

  const message: ToastMessageType = {
    pending: 'Claiming Rewards',
    success: 'Claim success',
    error: 'Claiming failed',
  }
  const claimRewards = async () => {
    handleSelectAction(ACTIONS_FARM_CARD.CLAIM)
    setIsLoading(true)
    onTransaction(true)
    updateTxStatus('txPrepared')
    const { tx, error } = await getGaugeRewards(gaugeAddress, address)
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
    }
    const data = await getFarmsData(address, chainId)
    setGaugeCardsData(data)
    setIsLoading(false)
  }

  return (
    <Button notMinW isFull isLoading={isLoading} isDisabled={!isConnected || disableClaim} onClick={claimRewards}>
      Claim
    </Button>
  )
}
export default ClaimFarmsButton
