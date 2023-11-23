import useBalance from '@/hooks/useBalance'
import { useStoreSelectedTiles } from '@/store'
import { clearPixelSelect, updateFullGridData, updateGridData } from '@/store/methods'
import { ADDRESS, ToastMessageType, Token, TransactionType } from '@/ts/types'
import { CONTRACTS, CONTRACT_ZERO, POLYGON } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { TOKENS } from '@/utils/tokens'
import { approve, checkAllowance, getNftGallery, getSingleGridData, placeTiles } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import { useState } from 'react'
import useNotification from '../../../hooks/useNotification'
import useTransaction from '../../../hooks/useTransaction'

const PlaceTile = ({ isLoading }: { isLoading: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { primaryWallet, network } = useDynamicContext()
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()
  const { selectedTiles, selectedColor, nftId } = useStoreSelectedTiles()
  const { getBalance } = useBalance()
  const balanceOTOKEN = getBalance('otoken')
  const quantityBN = parseEther(selectedTiles.length.toString())
  const disabled = balanceOTOKEN?.lt(quantityBN) || balanceOTOKEN?.isZero()
  const approvalValue = parseEther(selectedTiles.length.toString())
  const address = primaryWallet ? (primaryWallet.address as ADDRESS) : CONTRACT_ZERO
  const validNetwork = getNetwork(Number(network ?? POLYGON))
  const awaitTransaction = async (
    tx: TransactionType | null,
    error: unknown,
    message: ToastMessageType,
    throwError?: boolean,
  ) => {
    if (tx) {
      pendingToast(tx.hash, tx.wait, message)
      updateHash(tx.hash)
      updateTxStatus('txLoading')
      await tx.wait()
      updateTxStatus('txSuccess')
    }
    if (error) {
      errorToast('error', message.error)
      updateTxStatus('txError')
      if (throwError) throw new Error(message.error)
    }
  }

  const onAllowanceAndApprove = async (token: Token, spender: ADDRESS) => {
    const tokenAddress = token.address as ADDRESS
    const spenderAddress = spender as ADDRESS
    const allowance = await checkAllowance(tokenAddress, address, spenderAddress)
    const allowanceBN = BigNumber.from(allowance)
    if (allowanceBN.lt(quantityBN)) {
      updateTxStatus('txPrepared')
      const { error, tx } = await approve({ contractAddress: tokenAddress, spenderAddress }, approvalValue)
      const message: ToastMessageType = {
        pending: `Approving ${token.symbol}`,
        success: `Approve ${token.symbol} success`,
        error: `Error on Approve ${token.symbol} failed`,
      }
      await awaitTransaction(tx, error, message)
    }
  }
  const placeTile = async () => {
    setLoading(true)
    const xValues = selectedTiles.map((coor) => BigInt(coor.x))
    const yValues = selectedTiles.map((coor) => BigInt(coor.y))
    await onAllowanceAndApprove(TOKENS[validNetwork].OTOKEN, CONTRACTS[validNetwork].gridNFT)
    const { tx, error } = await placeTiles(address, validNetwork, nftId, yValues, xValues, selectedColor)
    updateTxStatus('txPrepared')
    const message: ToastMessageType = {
      pending: 'Placing tiles with OTOKEN',
      success: 'Placed tiles success',
      error: 'Error placing tiles failed or rejected',
    }
    await awaitTransaction(tx, error, message)
    const { pixels } = await getSingleGridData(validNetwork, nftId)
    const { svgGridData } = await getNftGallery(validNetwork)
    updateFullGridData(svgGridData)
    updateGridData({ nftId, pixels })
    clearPixelSelect()
    setLoading(false)
  }
  const handlePlaceTile = async () => {
    if (selectedTiles.length === 0) {
      const message: ToastMessageType = {
        pending: 'Placing tiles with OTOKEN',
        success: 'Placed tiles success',
        error: 'Error, there are no tiles selected',
      }
      errorToast('error', message.error)
    } else {
      await placeTile()
    }
  }
  return (
    <button
      disabled={isLoading || disabled || loading}
      className={`place-joystick-btn ${isLoading || disabled || loading ? 'opacity-80 bg-[#2F312E] ' : ''} `}
      type='button'
      onClick={() => handlePlaceTile()}>
      <p>Place</p>
    </button>
  )
}

export default PlaceTile
