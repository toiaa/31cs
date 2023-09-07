import { BigNumber } from '@ethersproject/bignumber'
import { BribeCardI, GaugeCardData } from './interfaces'

export type ADDRESS = `0x${string}`

export type SettingsTabsType = {
  id: number
  value: string
  label: string
}

export type PercentageSwapValuesType = {
  id: number
  value: number
  label: string
}
export type Balance = {
  amount: string
  price: string
}
export type Token = {
  address: ADDRESS | undefined
  symbol: string
  decimals: number
  name: string
  img: string
  id: TokenType
}

export type SwapTabTypes = {
  id: number
  name: ActionType
  options: OptionType[]
}

export interface MainTabTypes {
  [key: number]: SwapTabTypes
}

export interface ContractsType {
  [key: number]: {
    bondingCurve: ADDRESS
    vTokenReward: ADDRESS
    voter: ADDRESS
  }
}

export type StoreTokensType = {
  wrapped: BigNumber
  token: BigNumber
  otoken: BigNumber
  vtoken: BigNumber
  credit: BigNumber
  debt: BigNumber
  votingPower: BigNumber
}

export type StoreTokenRewardsType = {
  wrapped: BigNumber
  token: BigNumber
  otoken: BigNumber
  vtoken?: BigNumber
  credit?: BigNumber
  debt?: BigNumber
  votingPower?: BigNumber
  external?: BigNumber
  totalRewards: BigNumber
  stakingRewards: BigNumber
  farmingRewards: BigNumber
}

export type StoreAccountStatsType = {
  accountVotingPower: BigNumber
  accountUsedWeights: BigNumber
  accountMaxWidthdraw: BigNumber
  accountIsLastVote: BigNumber
}

export type StoreStatsType = {
  tvl: BigNumber
  circulatingTOKEN: BigNumber
  stakedTOKEN: BigNumber
  apr: BigNumber
  ltv: BigNumber
  marketCap: BigNumber
  emission: BigNumber
  maxMarketSell: BigNumber
}

export type StoreInputType = {
  inputValue: string
  craftValue: string
  outputValue: string
  bribeValue: string
  activeValue: InputType | null
}

export type StoreSwapType = {
  isDisabled: boolean
  message: string
}
export type StoreGaugeType = {
  [key: string]: GaugeCardData[] | null
  [key: string]: BigNumber[] | null
}

export type GaugeCardList = GaugeCardData[]

export type GaugeContractList = [
  [
    string,
    string,
    number,
    string,
    boolean,
    string,
    string,
    string[],
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
  ],
]

export interface SwapActions {
  [action: string]: {
    [option: string]: JSX.Element
  }
}

export type StoreSettingType = {
  unlimitedApproval: SettingsTabsType
  slippage: SettingsTabsType
  customSlippage: string
  slippageToletance: string
  txSpeed: SettingsTabsType
  deadline: string
}
export type StoreAccountType = {
  address: ADDRESS
  isConnected: boolean
  chainId: number
  whitelistedNetwork: boolean
}
export type StoreTxType = {
  txPrepared: boolean
  txLoading: boolean
  txSuccess: boolean
  txError: boolean
  hash: null | string
}

export type StoreActionType = {
  actionSelected: OptionType | null
  tokens: {
    inputToken: Token
    craftToken?: Token
    outputToken: Token
  } | null
  minAmount: BigNumber
  autoMinOutput: BigNumber
  isBuy: boolean
}

export type ToastMessageType = {
  pending: string
  success: string
  error: string
}

export type TokensType = {
  inputToken: Token
  outputToken: Token
}
export type ApproveType = {
  contractAddress: ADDRESS
  spenderAddress: ADDRESS
}

export type TokensApproveType = {
  [key: string]: {
    requestApprove: boolean
    tokensToApprove: TokensType
    secondTokensToApprove?: TokensType
  }
}

export type StoreBribesType = {
  bribes: BribeCardI[]
}

export type TransactionType = {
  hash: string
  wait: () => Promise<(value?: number | undefined) => void>
}

// Variables
export type ErrorsTypes = 'balance' | 'sell' | 'slippage' | 'vote' | 'voting'
export type AmountType = 'price' | 'percentage' | 'number'
export type TokenLabelType = Omit<Token, 'address' | 'decimals'>
export type SizeTypes = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type WeightTypes = 'normal' | 'bold' | 'semibold'
export type NavLabelTypes = 'Home' | 'Vote' | 'Farms' | 'Docs' | 'Gov'
export type NavLinkTypes = 'home' | 'vote' | 'farms' | 'docs' | 'governance' | 'claim'
export type StatsType = 'tvl' | 'circulatingTOKEN' | 'stakedTOKEN' | 'apr' | 'ltv' | 'emission' | 'marketCap'
export type TokenType = 'token' | 'otoken' | 'vtoken' | 'credit' | 'debt' | 'wrapped' | 'votingPower' | 'external'
export type InputType = 'inputValue' | 'craftValue' | 'outputValue' | 'bribeValue'
export type ActionType = 'Swap' | 'Options' | 'Earn' | 'Lend' | 'Wrap' | 'Bribe'
export type OptionType =
  | 'Buy'
  | 'Sell'
  | 'Exercise'
  | 'Redeem'
  | 'Stake'
  | 'Unstake'
  | 'Burn'
  | 'Borrow'
  | 'Repay'
  | 'Wrap'
  | 'Unrwap'
  | 'Approve'
  | 'Bribe'

export type BribeCardData = [
  ADDRESS,
  ADDRESS,
  boolean,
  string,
  string,
  ADDRESS[],
  number[],
  BigNumber[],
  BigNumber[],
  BigNumber,
  BigNumber,
  BigNumber,
]
export type FarmsCardData = [
  ADDRESS,
  ADDRESS,
  number,
  ADDRESS,
  boolean,
  string,
  string,
  ADDRESS[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
]
export interface FilterFarm {
  id: string
  label: string
}

export interface FilterFarmsObject {
  [key: string]: FilterFarm
}

export type StoreStatusContractsType = {
  loadingBonding: boolean
  loadingFarms: boolean
  loadingVote: boolean
}
