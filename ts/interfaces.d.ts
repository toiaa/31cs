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
  WeightTypes,
  DirectionsType,
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

export interface StatsInterface {
  isLoading: boolean
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
  onClick?: () => void
  direction?: DirectionsType
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

export interface UserBalancesI {
  [address: string]: BigNumber
}

export interface TokenModalI {
  onClose: () => void
  items: Token[]
  onSelectItem: (item: Token) => void
  type: string
}

export interface TokenInfoSectionI {
  items: Token[] | undefined
  img: string
  symbol: string
  detailAmountProps: DetailAmountInterface[]
  showLend: boolean
  isLoading: boolean
  showMaxWithdraw: boolean
}

export interface PixelGridInterface {
  nftId: string
  handleSaveSelection: (x: number, y: number, owner: string) => void
  selectedTiles: Tile[]
}
export interface SingleGridInterface {
  nftId: string
}
