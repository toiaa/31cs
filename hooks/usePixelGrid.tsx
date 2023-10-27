import { useStoreAccount, useStorePixelGrid } from '@/store'
import { ADDRESS } from '@/ts/types'
import { CONTRACT_ZERO, POLYGON, TIMEOUT } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { NETWORKS_LIST } from '@/utils/networks'
import { getSingleGridData } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'

const usePixelGrid = (nftId: string) => {
  const { primaryWallet, network } = useDynamicContext()
  const [loading, setLoading] = useState<boolean>(true)
  const [singleGridData, setSingleGridData] = useState<{ pixels: string; nftId: string }>({ pixels: '', nftId: '' })

  useEffect(() => {
    if (!primaryWallet) {
      useStoreAccount.setState({ address: undefined, isConnected: false })
    }
    const fetchPixelGrid = async () => {
      const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
      const validNetwork = getNetwork(Number(network ?? POLYGON))
      const { pixels } = await getSingleGridData(validNetwork, nftId)
      useStorePixelGrid.setState({ nftId: { nftId, pixels } })
      setSingleGridData({ pixels, nftId })
      useStoreAccount.setState({
        address,
        chainId: validNetwork,
        isConnected: primaryWallet ? true : false,
        whitelistedNetwork: NETWORKS_LIST.includes(Number(network)),
      })
      setLoading(false)
    }

    const timeoutId = setTimeout(() => {
      fetchPixelGrid()
    }, TIMEOUT)

    return () => clearTimeout(timeoutId)
  }, [primaryWallet, network, nftId])

  return { isLoading: loading, singleGridData }
}

export default usePixelGrid
