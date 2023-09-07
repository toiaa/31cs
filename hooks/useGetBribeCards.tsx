import { useStatusContracts, useStoreAccount, useStoreBribes, useStoreTokensBalance } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { getMulticallbondingVote } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect } from 'react'

const useGetBribeCards = () => {
  const { primaryWallet, network } = useDynamicContext()
  const { loadingVote } = useStatusContracts()

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }

    const fetchData = async () => {
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const { bondingCurveData, portfolioData, formatBribes, balances } = await getMulticallbondingVote(
        address,
        validNetwork,
      )

      useStoreTokensBalance.setState(balances)
      useStoreBribes.setState({ bribes: formatBribes }, true)
      updateBondingCurveData({ bondingCurveData, portfolioData })
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      useStatusContracts.setState({ loadingBonding: false, loadingVote: false })
    }

    const timeoutId = setTimeout(() => {
      fetchData()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network])

  return { isLoading: loadingVote }
}

export default useGetBribeCards
