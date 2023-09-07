import { useStatusContracts, useStoreAccount } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { getMulticallBondingCurveData } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect } from 'react'

const useBondingCurve = () => {
  const { primaryWallet, network } = useDynamicContext()
  const { loadingBonding } = useStatusContracts()

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }
    const fetchBondingData = async () => {
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const { bondingCurveData, portfolioData } = await getMulticallBondingCurveData(address, validNetwork)

      updateBondingCurveData({ bondingCurveData, portfolioData })
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      useStatusContracts.setState({ loadingBonding: false })
    }

    const timeoutId = setTimeout(() => {
      fetchBondingData()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network])

  return { isLoading: loadingBonding }
}

export default useBondingCurve
