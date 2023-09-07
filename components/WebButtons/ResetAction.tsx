import useBalance from '@/hooks/useBalance'
import useNotification from '@/hooks/useNotification'
import { useStoreAccount, useStoreBribes, useStoreTokensBalance } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ToastMessageType } from '@/ts/types'
import { ERRORS } from '@/utils/constants'
import { getMulticallbondingVote, reset } from '@/utils/web3Methods'
import { useState } from 'react'
import Button from '../Button'

const ResetAction = ({ isLastVote }: { isLastVote: boolean }) => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const [isLoading, setIsLoading] = useState(false)
  const balances = useBalance()
  const { getBalance } = balances
  const votingPower = getBalance('votingPower')
  const { pendingToast, errorToast } = useNotification()

  const message: ToastMessageType = {
    pending: 'Reset in progress',
    success: 'Reset success',
    error: 'Reset failed',
  }
  const onReset = async () => {
    if (isLastVote || votingPower.isZero()) {
      const errorText = isLastVote ? 'You have already voted this epoch' : ERRORS.voting
      errorToast('error', errorText)
    } else {
      setIsLoading(true)
      const { tx, error } = await reset(chainId)
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
      setIsLoading(false)
    }
  }

  const getStatusButton = () => {
    if (!isConnected || !whitelistedNetwork) {
      return true
    }
    return false
  }

  return (
    <Button notMinW isLoading={isLoading} isDisabled={getStatusButton()} onClick={onReset}>
      Reset Vote
    </Button>
  )
}
export default ResetAction
