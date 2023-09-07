import useNotification from '@/hooks/useNotification'
import { DEFAULT_VALUE, useStoreAccount, useStoreRewards } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ToastMessageType } from '@/ts/types'
import { CONTRACTS } from '@/utils/constants'
import { getMulticallBondingCurveData, harvest } from '@/utils/web3Methods'
import { useState } from 'react'
import Button from '../Button'

const HarvestButton = () => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const rewards = useStoreRewards()

  const checkRewards = () => {
    const { otoken, token, wrapped } = rewards
    return wrapped.gt(DEFAULT_VALUE) || otoken.gt(DEFAULT_VALUE) || token.gt(DEFAULT_VALUE)
  }

  const [isLoading, setIsLoading] = useState(false)
  const contractAddress = CONTRACTS[chainId].vTokenReward
  const { pendingToast, errorToast } = useNotification()

  const message: ToastMessageType = {
    pending: 'Harvest rewards in progress',
    success: 'Harvest rewards success',
    error: 'Harvest rewards failed',
  }
  const onHarvest = async () => {
    setIsLoading(true)
    const { tx, error } = await harvest(contractAddress, address)
    if (tx) {
      pendingToast(tx.hash, tx.wait, message)
      await tx.wait()
    }
    if (error) errorToast('error', message.error)
    const { bondingCurveData, portfolioData } = await getMulticallBondingCurveData(address, chainId)

    updateBondingCurveData({ bondingCurveData, portfolioData })
    setIsLoading(false)
  }

  const getStatusButton = () => {
    if (!isConnected || !whitelistedNetwork) return true
    return !checkRewards()
  }

  return (
    <Button isFull isLoading={isLoading} isDisabled={getStatusButton()} onClick={onHarvest}>
      Claim Rewards
    </Button>
  )
}
export default HarvestButton
