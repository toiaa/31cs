import { useStatusContracts, useStoreAccount } from '@/store'
import { updateFullGridData, updateMulticallData } from '@/store/methods'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { getMulticallData, getNftGallery } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect } from 'react'

const useMulticall = () => {
  const { primaryWallet, network } = useDynamicContext()
  const { loadingBonding, loadingGridGallery } = useStatusContracts()

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }
    const fetchMulticallgData = async () => {
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const { multicallData, portfolioData } = await getMulticallData(address, validNetwork)
      const { svgGridData } = await getNftGallery(validNetwork)
      updateFullGridData(svgGridData)
      updateMulticallData({ multicallData, portfolioData })
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      useStatusContracts.setState({ loadingBonding: false, loadingGridGallery: false })
    }

    const timeoutId = setTimeout(() => {
      fetchMulticallgData()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network])

  return { isLoading: loadingBonding, isLoadingGridGallery: loadingGridGallery }
}

export default useMulticall
