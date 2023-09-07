import { FarmsCardData } from '@/ts/types'
import { ERRORS, ERRORS_TYPE } from '@/utils/constants'
import { orderFarmsData } from '@/utils/farmsMethods'
import { BigNumber } from '@ethersproject/bignumber'
import { parseEther } from 'ethers/lib/utils.js'
import {
  useStoreAccountStats,
  useStoreGaugeCards,
  useStoreBalance,
  useStoreRewards,
  useStoreStats,
  useStoreSwap,
  useStoreTokensPrice,
} from '.'

export const updateBondingCurveData = async ({
  bondingCurveData,
  portfolioData,
}: {
  bondingCurveData: BigNumber[]
  portfolioData: BigNumber[]
}) => {
  const [
    priceBASE,
    priceTOKEN,
    priceOTOKEN,
    maxMarketSell,
    tvl,
    circulatingTOKEN,
    stakedTOKEN,
    apr,
    ltv,
    marketCap,
    weeklyOSOLID,
    accountBASE,
    accountTOKEN,
    accountOTOKEN,
    accountEarnedBASE,
    accountEarnedTOKEN,
    accountEarnedOTOKEN,
    accountVTOKEN,
    accountVotingPower,
    accountUsedWeights,
    accountBorrowCredit,
    accountBorrowDebt,
    accountMaxWithdraw,
    accountIsLastVote,
  ] = bondingCurveData

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
      vtoken: BigNumber.from(accountVTOKEN),
      credit: BigNumber.from(accountBorrowCredit),
      debt: BigNumber.from(accountBorrowDebt),
      votingPower: BigNumber.from(accountVotingPower),
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
      accountVotingPower: BigNumber.from(accountVotingPower),
      accountUsedWeights: BigNumber.from(accountUsedWeights),
      accountMaxWidthdraw: BigNumber.from(accountMaxWithdraw),
      accountIsLastVote: BigNumber.from(accountIsLastVote),
    },
    true,
  )
  useStoreStats.setState(
    {
      tvl,
      circulatingTOKEN,
      stakedTOKEN,
      apr,
      ltv,
      marketCap,
      emission: weeklyOSOLID,
      maxMarketSell: BigNumber.from(maxMarketSell),
    },
    true,
  )
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
export const setGaugeCardsData = async (data: FarmsCardData[]) => {
  const orderedData = orderFarmsData(data)
  useStoreGaugeCards.setState({ gauges: orderedData })
}
