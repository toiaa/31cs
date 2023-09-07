import { NavLinkInterface, StatsDataInterface } from '@/ts/interfaces'
import {
  SettingsTabsType,
  PercentageSwapValuesType,
  MainTabTypes,
  ContractsType,
  ADDRESS,
  FilterFarmsObject,
} from '@/ts/types'

export const IS_DEMO = true
export const WEBSITE = 'TOKENPROJECT'
export const MINT_AMOUNT = '10'
export const POLYGON = 80001
export const TIMEOUT = 800
export const NAVLINKS: NavLinkInterface[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
  },
  {
    id: 'farms',
    path: '/farms',
    label: 'Farms',
  },
  {
    id: 'vote',
    path: '/vote',
    label: 'Vote',
  },
  {
    id: 'claim',
    path: '/claim',
    label: 'Claim',
  },
  {
    id: 'governance',
    path: 'https://www.tally.xyz/gov/liltokendao',
    label: 'Gov',
  },
  {
    id: 'docs',
    path: 'https://heeshs-organization.gitbook.io/liltokenproject/liltoken/introduction',
    label: 'Docs',
  },
]

export const STATS_DATA: StatsDataInterface[] = [
  {
    label: 'TVL',
    type: 'price',
    id: 'tvl',
  },
  {
    label: 'Market Cap',
    type: 'price',
    id: 'marketCap',
  },
  {
    label: 'Circulating TOKEN',
    type: 'number',
    id: 'circulatingTOKEN',
  },
  {
    label: 'Staked TOKEN',
    type: 'number',
    id: 'stakedTOKEN',
  },
  {
    label: 'LTV',
    type: 'percentage',
    id: 'ltv',
  },
  {
    label: 'Weekly Emissions',

    type: 'number',
    id: 'emission',
  },
]

export const TABS: MainTabTypes = {
  0: {
    id: 0,
    name: 'Swap',
    options: ['Buy', 'Sell'],
  },
  1: {
    id: 1,
    name: 'Options',
    options: ['Exercise', 'Redeem'],
  },
  2: {
    id: 2,
    name: 'Earn',
    options: ['Stake', 'Unstake', 'Burn'],
  },
  3: {
    id: 3,
    name: 'Lend',
    options: ['Borrow', 'Repay'],
  },
  4: {
    id: 4,
    name: 'Wrap',
    options: ['Wrap', 'Unrwap'],
  },
}

export const TABS_LIST: { [key: string]: string[] } = {
  [POLYGON]: ['Swap', 'Options', 'Earn', 'Lend'],
}

export const OPTIONS_FUNCTIONS: { [key: string]: string } = {
  Buy: 'buy',
  Sell: 'sell',
  Exercise: 'exercise',
  Redeem: 'redeem',
  Stake: 'deposit',
  Unstake: 'withdraw',
  Burn: 'burnFor',
  Borrow: 'borrow',
  Repay: 'repay',
}

export const APPROVAL_TABS: SettingsTabsType[] = [
  {
    id: 0,
    value: 'false',
    label: 'One time approval',
  },
  {
    id: 1,
    value: 'true',
    label: 'Unlimited approval',
  },
]
export const SLIPPAGE_TABS: SettingsTabsType[] = [
  {
    id: 0,
    value: '0.5',
    label: '0.5%',
  },
  {
    id: 1,
    value: '1',
    label: '1%',
  },
  {
    id: 2,
    value: 'auto',
    label: 'auto',
  },
  {
    id: 3,
    value: '0',
    label: 'custom',
  },
]
export const TRANSACTION_SPEED_TABS: SettingsTabsType[] = [
  {
    id: 0,
    value: 'Standard',
    label: 'Standard',
  },
  {
    id: 1,
    value: 'Fast',
    label: 'Fast 164',
  },
  { id: 2, value: 'Rapid', label: 'Rapid 236' },
  { id: 3, value: 'Auto', label: 'Auto' },
]

export const PERCENTAGES_SWAP: PercentageSwapValuesType[] = [
  {
    id: 0,
    value: 25,
    label: '25%',
  },
  { id: 1, value: 50, label: '50%' },
  { id: 2, value: 75, label: '75%' },
  { id: 3, value: 100, label: '100%' },
]

export const CONTRACT_ZERO: ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_NETWORK = POLYGON
export const CONTRACTS: ContractsType = {
  [POLYGON]: {
    bondingCurve: '0x3a0899Bf14c9165FdA500d63789Bd4732A20b879',
    vTokenReward: '0x6a42D6334e4A05FE480E3De3C8fc159dB15f41E3',
    voter: '0x0375E50e3a58381b65Ce9D565313FD8f993101c5',
  },
}

export const CONTRACT_FUNCTIONS_BUY = ['quoteBuyIn', 'quoteBuyOut']
export const CONTRACT_FUNCTIONS_SELL = ['quoteSellIn', 'quoteSellOut']

export const ACTIONS_FARM_CARD = {
  DEPOSIT: 'Deposit',
  APPROVE: 'Approve',
  WITHDRAW: 'Withdraw',
  CLAIM: 'Claim',
  NOACTION: '',
}

export const FILTER_FARMS: FilterFarmsObject = {
  active: { id: 'active', label: 'Active farms' },
  inactive: { id: 'inactive', label: 'Inactive farms' },
  all: { id: 'all', label: 'All farms' },
}

export const ERRORS = {
  balance: 'Amount exceeds wallet balance',
  credit: 'Exceeds credit limit',
  debt: 'Exceeds debt limit',
  sell: 'Amount exceeds the max sell available',
  slippage: 'Caution, your slippage is high. Your trade may be front run',
  voting: 'Need at least 1 Voting Power',
  votes: 'Exceed votes percentage',
  loss: 'Loss tolerance exceeded, increase loss tolerance in settings',
  unstake: 'You need to reset your votes and pay your debts',
} as const

export const TOOLTIPS_TOKEN_CARD: { [key: string]: string } = {
  token: `Primary token back by WETH liquidity in bonding curve.
  Immutable floor price of 1 WETH/TOKEN.`,
  otoken: `Emission token distributed to farms.
  Call option on TOKEN.
  No expiration, 1 WETH strike price.`,
  vtoken: `Non-transferable voting token to govern and vote on farm emission weights.
  Earns swap fees, staking rewards, and voting rewards.
  Voting Power: Amount of votes available.
  Credit: Amount of WETH that can be borrowed from the bonding curve.
  Debt: Amount of WETH owed to the bonding curve.`,
}

export const TOOLTIPS_SECONDARY_SWAP_TABS: { [key: string]: string } = {
  buy: 'Buy TOKEN with WETH at its market price.',
  sell: 'Sell TOKEN for WETH at its market price.',
  exercise: 'Exercise 1 OTOKEN to Buy 1 TOKEN with 1 WETH.',
  redeem: 'Redeem to sell 1 TOKEN for 1 WETH.',
  stake: 'Staken 1 TOKEN for 1 VTOKEN to receive 1 Voting Power, 1 WETH Credit, and earn rewards.',
  unstake: `Unstake 1 VTOKEN to receive 1 TOKEN.
  Must reset votes and repay debts to unstake.`,
  burn: `Burn 1 OTOKEN to recieve 1 Voting Power and earn rewards.
   Burned OTOKEN is gone forever.`,
  borrow: 'Borrow 1 WETH with 1 VTOKEN collateral.',
  repay: 'Repay 1 WETH to unlock 1 VTOKEN collateral.',
}
export const TOOLTIPS_SWAP_TABS: { [key: string]: string } = {
  swap: 'Buy and Sell TOKEN at its market price.',
  options: 'Buy and Sell TOKEN at its floor price.',
  earn: 'Earn swap fees (TOKEN and WETH), staking rewards (OTOKEN), and voting rewards.',
  lend: `Manage a risk free loan against your VTOKEN.
  No liquidation, no interest, no oracle.`,
}

export type ERRORS_TYPE = keyof typeof ERRORS
export const WEEK = 604800
