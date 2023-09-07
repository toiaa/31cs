import useNotification from '@/hooks/useNotification'
import { useStoreAccount } from '@/store'
import { updateBondingCurveData } from '@/store/methods'
import { ADDRESS, ToastMessageType, Token } from '@/ts/types'
import { MINT_AMOUNT } from '@/utils/constants'
import { getMulticallBondingCurveData, mintToken } from '@/utils/web3Methods'
import React, { useState } from 'react'
import Button from '../Button'

const MintButton = ({ token }: { token: Token }) => {
  const { chainId, address, isConnected, whitelistedNetwork } = useStoreAccount()

  const [isLoading, setIsLoading] = useState(false)

  const { pendingToast, errorToast } = useNotification()

  const mint = async (tokenAddress: ADDRESS, symbol: string) => {
    if (whitelistedNetwork) {
      const message: ToastMessageType = {
        pending: `Minting ${MINT_AMOUNT} ${symbol}`,
        success: `Mint ${MINT_AMOUNT} ${symbol} success`,
        error: `Minting ${symbol} failed`,
      }
      setIsLoading(true)
      const { tx, error } = await mintToken(tokenAddress, address)
      if (tx) {
        pendingToast(tx.hash, tx.wait, message)
        await tx.wait()
      }
      if (error) errorToast('error', message.error)
      const { bondingCurveData, portfolioData } = await getMulticallBondingCurveData(address, chainId)

      updateBondingCurveData({ bondingCurveData, portfolioData })
      setIsLoading(false)
    }
  }
  return (
    <Button
      isLoading={isLoading}
      isDisabled={!isConnected}
      onClick={() => mint(token.address as ADDRESS, token.symbol)}>
      {` Mint ${MINT_AMOUNT} ${token.symbol}`}
    </Button>
  )
}

export default MintButton
