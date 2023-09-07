import useNotification from '@/hooks/useNotification'
import { useStoreAccount, useStoreBribes, useStoreTokensBalance } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ToastMessageType } from '@/ts/types'
import { claim, getMulticallbondingVote } from '@/utils/web3Methods'
import { useState } from 'react'
import Button from '../Button'

const ClaimAction = ({ notRewards }: { notRewards: boolean }) => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const { bribes } = useStoreBribes()
  const [isLoading, setIsLoading] = useState(false)

  const { pendingToast, errorToast } = useNotification()

  const message: ToastMessageType = {
    pending: 'Claim in progress',
    success: 'Claim success',
    error: 'Claim failed',
  }
  const onClaim = async () => {
    const userBribes = bribes.filter((bribe) => bribe.accountVotePercent.gt(0))
    const bribeAddresses = userBribes.map((bribe) => bribe.bribeAddress)
    setIsLoading(true)
    const { tx, error } = await claim(bribeAddresses, chainId)
    if (tx) {
      pendingToast(tx.hash, tx.wait, message)
      await tx.wait()
    }
    if (error) errorToast('error', message.error)
    const { bondingCurveData, portfolioData, formatBribes, balances } = await getMulticallbondingVote(address, chainId)
    useStoreTokensBalance.setState(balances)
    useStoreBribes.setState({ bribes: formatBribes })
    updateBondingCurveData({ bondingCurveData, portfolioData })
    setIsLoading(false)
  }

  const getStatusButton = () => {
    if (!isConnected || !whitelistedNetwork || notRewards) {
      return true
    }
    return false
  }

  return (
    <Button isLoading={isLoading} isDisabled={getStatusButton()} onClick={onClaim}>
      Claim Rewards
    </Button>
  )
}
export default ClaimAction
