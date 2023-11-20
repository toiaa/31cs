import { ERRORS, ERRORS_TYPE, TILE_COLORS } from '@/utils/constants'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from 'ethers/lib/utils.js'
import {
  useModalStats,
  useStoreAccountStats,
  useStoreBalance,
  useStoreGridGallery,
  useStorePixelGrid,
  useStoreRewards,
  useStoreSelectedTiles,
  useStoreStats,
  useStoreSwap,
  useStoreTokensPrice,
} from '.'

export const updateMulticallData = async ({
  multicallData,
  portfolioData,
}: {
  multicallData: BigNumber[]
  portfolioData: BigNumber[]
}) => {
  const [
    priceBASE,
    priceTOKEN,
    priceOTOKEN,
    maxMarketSell,
    tvl,
    supplyTOKEN,
    supplyStaked,
    apr,
    ltv,
    marketCap,
    weeklyOTOKEN,
    accountBASE,
    accountTOKEN,
    accountOTOKEN,
    accountEarnedBASE,
    accountEarnedTOKEN,
    accountEarnedOTOKEN,
    accountStaked,
    accountPower,
    accountBorrowCredit,
    accountBorrowDebt,
    accountMaxWithdraw,
  ] = multicallData

  const [totalRewards, stakingRewards, farmingRewards] = portfolioData

  useStoreTokensPrice.setState(
    {
      wrapped: BigNumber.from(priceBASE),
      token: BigNumber.from(priceTOKEN),
      otoken: BigNumber.from(priceOTOKEN),
      vtoken: BigNumber.from(priceTOKEN),
      credit: BigNumber.from(priceBASE),
      debt: BigNumber.from(priceBASE),
      votingPower: BigNumber.from(priceBASE),
    },
    true,
  )
  useStoreBalance.setState(
    {
      wrapped: BigNumber.from(accountBASE),
      token: BigNumber.from(accountTOKEN),
      otoken: BigNumber.from(accountOTOKEN),
      vtoken: BigNumber.from(accountStaked),
      credit: BigNumber.from(accountBorrowCredit),
      debt: BigNumber.from(accountBorrowDebt),
      votingPower: BigNumber.from(accountPower),
    },
    true,
  )
  useStoreRewards.setState(
    {
      wrapped: BigNumber.from(accountEarnedBASE),
      token: BigNumber.from(accountEarnedTOKEN),
      otoken: BigNumber.from(accountEarnedOTOKEN),
      totalRewards: BigNumber.from(totalRewards),
      stakingRewards: BigNumber.from(stakingRewards),
      farmingRewards: BigNumber.from(farmingRewards),
    },
    true,
  )
  useStoreAccountStats.setState(
    {
      accountVotingPower: BigNumber.from(accountPower),

      accountMaxWidthdraw: BigNumber.from(accountMaxWithdraw),
    },
    true,
  )
  useStoreStats.setState(
    {
      tvl,
      circulatingTOKEN: supplyTOKEN,
      stakedTOKEN: supplyStaked,
      apr,
      ltv,
      marketCap,
      emission: weeklyOTOKEN,
      maxMarketSell: BigNumber.from(maxMarketSell),
    },
    true,
  )
}

export const updateGridData = async ({ nftId, pixels }: { nftId: string; pixels: [] }) => {
  if (useStoreSelectedTiles.getState().nftId === nftId) {
    useStorePixelGrid.setState({
      nftId: {
        nftId,
        pixels,
      },
    })
  }
}

export const updateFullGridData = async (svgGridData: string[]) => {
  const gridGallery: { [key: string]: string } = svgGridData.reduce((obj: { [key: string]: string }, item, index) => {
    obj[index] = item
    return obj
  }, {})
  useStoreGridGallery.setState({ gridGallery })
}

export const clearPixelSelect = (nftId = '') => {
  useStoreSelectedTiles.setState({ selectedTiles: [], nftId: nftId, selectedColor: '4' })
}
export const toggleStatsModal = (onClose?: boolean) => {
  if (onClose) {
    useModalStats.setState(() => ({ isOpen: false }))
  } else {
    useModalStats.setState((state) => ({ isOpen: !state.isOpen }))
  }
}

export const getStatus = (amount: string, balance: BigNumber, id: ERRORS_TYPE): boolean => {
  const parsedAmount = parseEther(amount)

  if (balance.lt(parsedAmount)) {
    useStoreSwap.setState({ isDisabled: true, message: ERRORS[id] })
  } else {
    if (useStoreSwap.getState().isDisabled) useStoreSwap.setState({ isDisabled: false, message: '' })
  }
  return balance.lt(parsedAmount)
}

export const resetStatus = () => {
  useStoreSwap.setState({ isDisabled: false, message: '' })
}

export const handleChangeColor = () => {
  const limit = Object.keys(TILE_COLORS).length - 1
  const { selectedColor } = useStoreSelectedTiles.getState()
  const newSelection = Number(selectedColor) < limit ? `${Number(selectedColor) + 1}` : '0'
  useStoreSelectedTiles.setState({ selectedColor: newSelection })
}
