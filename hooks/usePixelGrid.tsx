import { useStoreAccount, useStorePixelGrid } from '@/store'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { getSingleGridData } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'

const usePixelGrid = () => {
  const { primaryWallet, network } = useDynamicContext()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }
    const fetchTokenURI = async () => {
      setLoading(true)
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const { singleGridData } = await getSingleGridData(address, validNetwork)

      useStorePixelGrid.setState({ pixelGrids: singleGridData })
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      setLoading(false)
    }

    const timeoutId = setTimeout(() => {
      fetchTokenURI()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network])

  return { isLoading: loading }
}

export default usePixelGrid
