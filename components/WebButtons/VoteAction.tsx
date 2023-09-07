import useBalance from '@/hooks/useBalance'
import useNotification from '@/hooks/useNotification'
import { useStoreAccount, useStoreBribes, useStoreTokensBalance } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { UserVotes } from '@/ts/interfaces'
import { ToastMessageType } from '@/ts/types'
import { ERRORS } from '@/utils/constants'
import { getMulticallbondingVote, vote } from '@/utils/web3Methods'
import { useState } from 'react'
import Button from '../Button'

const VoteAction = ({ userVotes, isLastVote }: { userVotes: UserVotes; isLastVote: boolean }) => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()
  const [isLoading, setIsLoading] = useState(false)
  const balances = useBalance()
  const { getBalance } = balances
  const votingPower = getBalance('votingPower')

  const { pendingToast, errorToast } = useNotification()

  const message: ToastMessageType = {
    pending: 'Votes in progress',
    success: 'Votes success',
    error: 'Votes failed',
  }

  const onVote = async () => {
    if (isLastVote || votingPower.isZero()) {
      const errorText = isLastVote ? 'You have already voted this epoch' : ERRORS.voting
      errorToast('error', errorText)
    } else {
      const pluginAddresses = Object.keys(userVotes)
      const values = Object.values(userVotes)
      setIsLoading(true)
      const { tx, error } = await vote(pluginAddresses, values, chainId)
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
    if (!isConnected || Object.keys(userVotes).length === 0 || !whitelistedNetwork) {
      return true
    }
    return false
  }

  return (
    <Button notMinW isLoading={isLoading} isDisabled={getStatusButton()} onClick={onVote}>
      Confirm Vote
    </Button>
  )
}
export default VoteAction
