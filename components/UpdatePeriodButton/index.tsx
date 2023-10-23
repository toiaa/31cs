import useNotification from '@/hooks/useNotification'
import { useStoreAccount } from '@/store'
import { updateMulticallData } from '@/store/methods'
import { ToastMessageType } from '@/ts/types'
import { getMulticallData, updatePeriod } from '@/utils/web3Methods'
import React, { useState } from 'react'
import Button from '../Button'

const UpdatePeriodButton = () => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()

  const [isLoading, setIsLoading] = useState(false)

  const { pendingToast, errorToast } = useNotification()

  const mint = async () => {
    if (whitelistedNetwork) {
      const message: ToastMessageType = {
        pending: 'Update Period in progress',
        success: 'Update Period success',
        error: 'Update Period failed',
      }
      setIsLoading(true)
      const { tx, error } = await updatePeriod()
      if (tx) {
        pendingToast(tx.hash, tx.wait, message)
        await tx.wait()
      }
      if (error) errorToast('error', message.error)
      const { multicallData, portfolioData } = await getMulticallData(address, chainId)

      updateMulticallData({ multicallData, portfolioData })
      setIsLoading(false)
    }
  }
  return (
    <Button isLoading={isLoading} isDisabled={!isConnected} onClick={() => mint()}>
      Update Period
    </Button>
  )
}

export default UpdatePeriodButton
