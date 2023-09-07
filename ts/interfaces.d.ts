import {
  AmountType,
  Token,
  NavLinkTypes,
  SettingsTabsType,
  SlippageSettingsTabsType,
  StatsType,
  InputType,
  ActionType,
  OptionType,
  TokenType,
  ADDRESS,
  WeightTypes,
} from '@/ts/types'
import { BigNumber } from '@ethersproject/bignumber'
import { ReactNode } from 'react'

// Component Interfaces
export interface WrapperInterface {
  children: ReactNode
}
interface LinkProps extends WrapperInterface {
  url?: string
  target?: string
}

export interface ButtonInterface extends WrapperInterface {
  onClick?: (() => void) | (() => Promise<void>)
  isDisabled?: boolean
  isLoading?: boolean
  border?: boolean
  isTransparent?: boolean
  isFull?: boolean
  isSecondary?: boolean
  icon?: JSX.Element
  textLoading?: string | null
  notMinW?: boolean
}

export type IconButtonInterface = ButtonInterface

export interface DrawerInterface {
  toggleDrawer: boolean
  onClose: () => void
}

export interface NavInterface {
  id: NavLinkTypes
  path: string
  label: string
  onClose?: () => void
  isMobile?: boolean
}

export interface AmountInterface {
  weight?: WeightTypes
  type: AmountType
  amount: string
  color?: string
  isLoading?: boolean
  decimals?: number
  size?: string
}

export interface StatsDataInterface extends AmountInterface {
  label: string
  amount?: string
  id: StatsType
}
export interface DetailAmountInterface extends AmountInterface {
  label: string
}

export interface TokenItemInterface {
  token: Token
}

export interface SwapPanelInterface {
  onTransactionStatus: (status: boolean) => void
  currentOption: OptionType
  currentAction: ActionType
  currentTokens: Token[]
}
export interface SwapTabsInterface {
  activeTab: number
  list: string[]
  onUpdate: (index: number) => void
}

export interface ContainertopSwapInterface extends SwapPanelInterface {
  onTransactionStatus?: (status: boolean) => void
}
export interface ContainerBottomSwapInterface extends SwapPanelInterface {
  showSlippage?: boolean
  currentAction?: ActionType
  currentTokens?: Token[]
}

export interface TokenAmountCardInterface {
  token: Token
  inputToken: Token
  inputKey: InputType
  currentAction: ActionType
  currentOption: OptionType
  isLoading?: boolean
  showPercentage?: boolean
  showTokenList?: boolean
  onSelectItem?: (item: BribeCardI | Token) => void
  onOpenList?: () => void
  items?: Token[]
}

export interface NavLinkInterface extends NavInterface {
  id: NavLinkTypes
}

export interface IconInterface {
  color?: string
  maxWidth?: string
  size?: number
  text?: string
}

export interface TokensInterface {
  OTOKEN: Token
  TOKEN: Token
  VTOKEN: Token
  WRAPPED: Token
  Credit: Token
  Debt: Token
  VotingPower: Token
}
export interface TokensNetworkInterface {
  [key: number]: TokensInterface
}

export interface DeadlineMinutesInterface {
  minutes: string
}

export interface SettingsTabsInterface {
  activeTabId: number
  list: SettingsTabsType[]
  onSelect: (number) => void
}
export interface SlippageSettingsTabsInterface {
  activeTabId: number
  list: SlippageSettingsTabsType[]
  onSelect: (number) => void
}

export interface InputInterface {
  value: string
  onInput: (value: string) => void
  isDisabled
  onError?: (showError: boolean) => void
  type?: AmountType
  maxW?: boolean
  textCenter?: boolean
}

export interface RewardInterface {
  id: TokenType
}

export interface PercentageInterface {
  handleInput: (typeValue: string) => void
  balance: BigNumber
}

export interface FarmCardHeaderInterface {
  tokens: string
}
export interface FarmsStatsInterface {
  rewardPerToken: BigNumber
  rewardPerTokenUSD: BigNumber
  stakedTokens: BigNumber
  votingWeight: BigNumber
}
export interface FarmCardOptionInterface {
  action: string
  actionLabel: string
  handleSelectAction: (action: string) => void
  dataLabel: string
  dataValue: BigNumber
  priceMultiplier: BigNumber
  gaugeAddress: string
  onTransaction: (status: boolean) => void
}
export interface FarmCardActionInterface {
  value: string
  action: string
  plugin: string
  symbol: string
  isAlive: boolean
  balance: {
    [key: string]: BigNumber
  }
  underlyingAddress: string
  accountStakedTokens: BigNumber
  cancelAction: () => void
  handleSelectAction: (action: string) => void
  isActionSelected: boolean
  handleInput: (typeValue: string) => void
  onTransaction: (status: boolean) => void
}

export interface FarmCardFooterInterface {
  isInsuficient: boolean
  isAlive: boolean
  underlyingAddress: string
  symbol: string
  value: string
  plugin: string
  action: string
  cancelAction: () => void
  isActionSelected: boolean
  handleSelectAction: (action: string) => void
  onTransaction: (status: boolean) => void
}

export interface GaugeCardData {
  plugin: string
  underlyingAddress: string
  underlyingDecimals: number
  gaugeAddress: string
  isAlive: boolean
  symbol: string
  protocol: string
  tokensInUnderlying: string[]
  priceBase: BigNumber
  priceOTOKEN: BigNumber
  rewardPerToken: BigNumber
  rewardPerTokenUSD: BigNumber
  votingWeight: BigNumber
  totalSupply: BigNumber
  accountUnderlyingTokens: BigNumber
  accountStakedTokens: BigNumber
  accountEarnedOTOKEN: BigNumber
}

export interface ClaimFarmsInterface {
  disableClaim: boolean
  handleSelectAction: (action: string) => void
  gaugeAddress: string
  onTransaction: (status: boolean) => void
}

export interface FilterFarmsInterface {
  handleFilterSelect: (filter: string) => void
  filter: string
  protocols: string[]
  checkedProtocols: string[]
  onSelectProtocols: (protocol: string) => void
}
export interface BribeCardI {
  pluginAddress: ADDRESS
  bribeAddress: ADDRESS
  isAlive: boolean
  protocol: string
  symbol: string
  rewardTokens: ADDRESS[]
  rewardTokenDecimals: number[]
  rewardsPerToken: BigNumber[]
  accountRewardsEarned: BigNumber[]
  voteWeight: BigNumber
  votePercent: BigNumber
  accountVotePercent: BigNumber
}

export interface VoteTokenI {
  symbol: string
  protocol: string
}

export interface RewardSectionI {
  rewardTokenDecimals: number[]
  rewardTokens: Token[]
  rewardsPerToken: BigNumber[]
}

export interface RewardVoteI {
  symbol: string
  amount: string
}

export interface UserVotes {
  [address: string]: string
}
export interface UserBalancesI {
  [address: string]: BigNumber
}

export interface VoteInputI {
  pluginAddress: string
  updateVotes: (address: string, value: string) => void
}

export interface TransactionStatusInterface {
  action?: string
  handleSelectAction?: (action: string) => void
  value?: string
  actionSelectedFarms?: string
  isFarm?: boolean
  onTransaction?: (status: boolean) => void
  rewards?: BigNumber
}

export interface InfoTransactionInterface {
  isFarm?: boolean
  value?: string
  actionSelectedFarms?: string
  rewards?: BigNumber
}
export interface BribeSelectorCardI {
  bribe: BribeCardI
  bribes: BribeCardI[]
  onSelectItem: (item: BribeCardI | Token) => void
}
export interface TokenModalI {
  onClose: () => void
  items: BribeCardI[] | Token[]
  onSelectItem: (item: BribeCardI | Token) => void
  type: string
}
export interface BribeModalI {
  onClose: () => void
  bribes: BribeCardI[]
}

export interface TokenInfoSectionI {
  onOpenBribe: () => void
  items: Token[] | undefined
  img: string
  symbol: string
  detailAmountProps: DetailAmountInterface[]
  showLend: boolean
  isLoading: boolean
  showMaxWithdraw: boolean
}
