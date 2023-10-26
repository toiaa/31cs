import Button from '@/components/Button'
import { useStoreSelectedTiles } from '@/store'
import { updateFullGridData, updateGridData } from '@/store/methods'
import { GridActionsInterface } from '@/ts/interfaces'
import { ADDRESS, ToastMessageType, Token, TransactionType } from '@/ts/types'
import { CONTRACTS, CONTRACT_ZERO, POLYGON } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { TOKENS } from '@/utils/tokens'
import { approve, checkAllowance, getNftGallery, getSingleGridData, placeTiles } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { BigNumber, ethers } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import useNotification from '../../hooks/useNotification'
import useTransaction from '../../hooks/useTransaction'

const PlaceTile = ({ clearPixelSelect }: GridActionsInterface) => {
  const { primaryWallet, network } = useDynamicContext()
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()
  const { selectedTiles, selectedColor, nftId } = useStoreSelectedTiles()
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
    console.log('allowance:', allowanceBN.toString(), 'approval:', approvalValue.toString())
    if (allowanceBN.lt(ethers.constants.MaxUint256)) {
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
    const xValues = selectedTiles.map((coor) => BigInt(coor.x))
    const yValues = selectedTiles.map((coor) => BigInt(coor.y))
    await onAllowanceAndApprove(TOKENS[validNetwork].OTOKEN, CONTRACTS[validNetwork].gridNFT)
    const { tx, error } = await placeTiles(address, validNetwork, nftId, yValues, xValues, selectedColor)
    updateTxStatus('txPrepared')
    const message: ToastMessageType = {
      pending: 'Placing tiles with OTOKEN',
      success: 'Placed tiles success',
      error: 'Error, Placing tiles failed',
    }
    await awaitTransaction(tx, error, message)
    const { pixels } = await getSingleGridData(address, validNetwork, nftId)
    const { svgGridData } = await getNftGallery(validNetwork)
    updateFullGridData(svgGridData)
    updateGridData({ nftId, pixels })
    clearPixelSelect && clearPixelSelect()
  }
  return <Button onClick={placeTile}>Place Tile</Button>
}

export default PlaceTile
