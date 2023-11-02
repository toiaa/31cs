import { NavLinkInterface, StatsDataInterface } from '@/ts/interfaces'
import {
  SettingsTabsType,
  PercentageSwapValuesType,
  MainTabTypes,
  ADDRESS,
  colorMapType,
  ContractsType,
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
    id: 'grid',
    path: '/grid',
    label: 'Grid',
  },
  {
    id: 'game',
    path: '/game',
    label: 'Game',
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
    multicall: '0x31e7B6ed09B863f952c9648754a146eF30Df33bc',
    gridNFT: '0xde84d1E00cA5c27F598dea68320F25167fde308F',
    gridRewarder: '0xA0377Fe6d61f8D568344dBD3bEBb5D3721931Ab6',
    minter: '0x5bB6134c6a4559dDBa0c60b1AcE7c2597E91E7e2',
    fees: '0x6ae1b766cB88eE2c403D861bd1a8Fc0FD3512466',
  },
}

export const CONTRACT_FUNCTIONS_BUY = ['quoteBuyIn', 'quoteBuyOut']
export const CONTRACT_FUNCTIONS_SELL = ['quoteSellIn', 'quoteSellOut']

export const ERRORS = {
  balance: 'Amount exceeds wallet balance',
  credit: 'Exceeds credit limit',
  debt: 'Exceeds debt limit',
  sell: 'Amount exceeds the max sell available',
  slippage: 'Caution, your slippage is high. Your trade may be front run',
  voting: 'Need at least 1 Power',
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
  Power: Amount of votes available.
  Credit: Amount of WETH that can be borrowed from the bonding curve.
  Debt: Amount of WETH owed to the bonding curve.`,
}

export const TOOLTIPS_SECONDARY_SWAP_TABS: { [key: string]: string } = {
  buy: 'Buy TOKEN with WETH at its market price.',
  sell: 'Sell TOKEN for WETH at its market price.',
  exercise: 'Exercise 1 OTOKEN to Buy 1 TOKEN with 0.0001 WETH.',
  redeem: 'Redeem to sell 1 TOKEN for 0.0001 WETH.',
  stake: 'Staken 1 TOKEN for 1 VTOKEN to receive 1 Power, 1 WETH Credit, and earn rewards.',
  unstake: `Unstake 1 VTOKEN to receive 1 TOKEN.
  Must reset votes and repay debts to unstake.`,
  burn: `Burn 1 OTOKEN to recieve 1 Power and earn rewards.
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

export const TILE_COLORS: colorMapType = {
  0: '#000000', // black
  1: '#18fc03', // green
  2: '#fce303', // yellow
  3: '#fc0317', // red
  4: '#03a5fc', // blue
  5: '#db03fc', // purple
  6: '#FFFFFF', // white
  7: '#FF9700', // orange
}
