import { useStatusContracts, useStoreAccount } from '@/store'
import { setGaugeCardsData } from '@/store/methods'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getFarmsData } from '@/utils/farmsMethods'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect } from 'react'

const useFarms = () => {
  const { primaryWallet, network } = useDynamicContext()
  const { loadingFarms } = useStatusContracts()

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }
    const fetchFarmsData = async () => {
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const gaugeCards = await getFarmsData(address, validNetwork)
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      setGaugeCardsData(gaugeCards)
      useStatusContracts.setState({ loadingFarms: false })
    }

    const timeoutId = setTimeout(() => {
      fetchFarmsData()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network])

  return { isLoading: loadingFarms }
}

export default useFarms
