import { BigNumber } from '@ethersproject/bignumber'

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
    multicall: ADDRESS
    gridNFT: ADDRESS
    gridRewarder: ADDRESS
    minter: ADDRESS
    fees: ADDRESS
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
  activeValue: InputType | null
}

export type StoreSwapType = {
  isDisabled: boolean
  message: string
}

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

export type TransactionType = {
  hash: string
  wait: () => Promise<(value?: number | undefined) => void>
}

// Variables
export type AmountType = 'price' | 'percentage' | 'number'
export type TokenLabelType = Omit<Token, 'address' | 'decimals'>
export type SizeTypes = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
export type WeightTypes = 'normal' | 'bold' | 'semibold'
export type NavLabelTypes = 'Home' | 'Docs' | 'Grid' | 'Game'
export type NavLinkTypes = 'home' | 'docs' | 'grid' | 'game'
export type StatsType = 'tvl' | 'circulatingTOKEN' | 'stakedTOKEN' | 'apr' | 'ltv' | 'emission' | 'marketCap'
export type TokenType = 'token' | 'otoken' | 'vtoken' | 'credit' | 'debt' | 'wrapped' | 'votingPower' | 'external'
export type InputType = 'inputValue' | 'craftValue' | 'outputValue'
export type ActionType = 'Swap' | 'Options' | 'Earn' | 'Lend' | 'Wrap'
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

export type StoreStatusContractsType = {
  loadingBonding: boolean
  loadingGridGallery: boolean
}

export type colorMapType = { [key: string]: string }

export type StoreGridGalleryType = { gridGallery: { [key: string]: string } }
export type StorePixelGrids = {
  [nftId: string]: {
    nftId: string
    pixels: [][]
  }
}
export type Tile = {
  x: number
  y: number
}
export type StoreSelectedTiles = {
  nftId: string
  selectedTiles: Tile[]
  selectedColor: string
}
export type StoreGridApproved = {
  gridApproved: boolean
}
