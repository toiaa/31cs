import Button from '@/components/Button'
import { useStoreGridApproved, useStoreSelectedTiles } from '@/store'
import { updateGridData } from '@/store/methods'
import { GridActionsInterface } from '@/ts/interfaces'
import { ADDRESS, ToastMessageType, Token, TransactionType } from '@/ts/types'
import { CONTRACTS, CONTRACT_ZERO, POLYGON, MAX_VALUE } from '@/utils/constants'
import { getNetwork } from '@/utils/methods'
import { TOKENS } from '@/utils/tokens'
import { approve, checkAllowance, getSingleGridData, placeTiles } from '@/utils/web3Methods'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { BigNumber } from 'ethers'
import useNotification from '../../hooks/useNotification'
import useTransaction from '../../hooks/useTransaction'

const PlaceTile = ({ clearSelection }: GridActionsInterface) => {
  const { primaryWallet, network } = useDynamicContext()
  const { pendingToast, errorToast } = useNotification()
  const { updateTxStatus, updateHash } = useTransaction()
  const { selectedTiles, selectedColor, nftId } = useStoreSelectedTiles()
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
    useStoreGridApproved.setState((state) => ({ ...state, allowance }))
    const allowanceBN = BigNumber.from(allowance)
    if (allowanceBN.lt(MAX_VALUE)) {
      updateTxStatus('txPrepared')
      const { error, tx } = await approve({ contractAddress: tokenAddress, spenderAddress }, MAX_VALUE)
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
    updateGridData({ nftId, pixels })
    clearSelection && clearSelection()
  }
  return <Button onClick={placeTile}>Place Tile</Button>
}

export default PlaceTile
