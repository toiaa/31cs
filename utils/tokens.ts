import { TokensNetworkInterface } from '@/ts/interfaces'
import { Token } from '@/ts/types'
import { IS_DEMO, POLYGON } from './constants'

const TOKENS_PATH = '/images/tokens'

const DEMO_BASE_Polygon: Token = {
  address: '0x17548E0b3f3d556907DF9A61352afB18D8506C32',
  decimals: 18,
  img: `${TOKENS_PATH}/eth.png`,
  name: 'WRAPPED ETHER',
  symbol: 'WETH',
  id: 'wrapped',
}
const REAL_BASE_Polygon: Token = {
  address: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
  decimals: 18,
  img: `${TOKENS_PATH}/eth.png`,
  name: 'WRAPPED ETHER',
  symbol: 'WETH',
  id: 'wrapped',
}

const OTOKEN_Polygon: Token = {
  address: '0xc759291f52cA29d754cb071Cc7BC41F3E029b045',
  decimals: 18,
  img: `${TOKENS_PATH}/otoken.png`,
  name: 'OTOKEN',
  symbol: 'OTOKEN',
  id: 'otoken',
}
const TOKEN_Polygon: Token = {
  address: '0x6cC3217Eed6d45497b0f566522C36927da108321',
  decimals: 18,
  img: `${TOKENS_PATH}/token.png`,
  name: 'TOKEN',
  symbol: 'TOKEN',
  id: 'token',
}

const VTOKEN_Polygon: Token = {
  address: '0xCa65906fc9FA6212169BcFE04D8e3df6ABC79e10',
  decimals: 18,
  img: `${TOKENS_PATH}/vtoken.png`,
  name: 'VTOKEN',
  symbol: 'VTOKEN',
  id: 'vtoken',
}

const Credit_Polygon: Token = {
  address: undefined,
  decimals: 18,
  img: `${TOKENS_PATH}/credit.png`,
  name: 'CREDIT',
  symbol: 'CREDIT',
  id: 'credit',
}
const Debt_Polygon: Token = {
  address: undefined,
  decimals: 18,
  img: `${TOKENS_PATH}/debt.png`,
  name: 'DEBT',
  symbol: 'DEBT',
  id: 'debt',
}
const VP_Polygon: Token = {
  address: undefined,
  decimals: 18,
  img: `${TOKENS_PATH}/votingpower.png`,
  name: 'Voting Power',
  symbol: 'Voting Power',
  id: 'votingPower',
}

const USDC: Token = {
  address: '0xeaD12Cd8fcb3ed3Fc2e0FD881b53048eCEbD1290',
  decimals: 18,
  img: `${TOKENS_PATH}/usdc.png`,
  name: 'Voting Power',
  symbol: 'USDC',
  id: 'external',
}

const DAI: Token = {
  address: '0x218c66c9092DC6025343e3d36B3Cc38ae49a3577',
  decimals: 18,
  img: `${TOKENS_PATH}/dai.png`,
  name: 'Voting Power',
  symbol: 'DAI',
  id: 'external',
}

const WBTC: Token = {
  address: '0x6d6C42723Dea7C2077AFF8a8fdB6417c6e20D041',
  decimals: 18,
  img: `${TOKENS_PATH}/wbtc.png`,
  name: 'Wrapped Bitcoin',
  symbol: 'WBTC',
  id: 'external',
}

const SWAP: Token = {
  address: '0x329b3F5A680389D03EeFe6987dC8Fc82eE839EE1',
  decimals: 18,
  img: `${TOKENS_PATH}/swap.png`,
  name: 'Voting Power',
  symbol: 'SWAP',
  id: 'external',
}

const BASE = IS_DEMO ? DEMO_BASE_Polygon : REAL_BASE_Polygon

export const TOKENS: TokensNetworkInterface = {
  [POLYGON]: {
    OTOKEN: OTOKEN_Polygon,
    TOKEN: TOKEN_Polygon,
    WRAPPED: BASE,
    VTOKEN: VTOKEN_Polygon,
    Credit: Credit_Polygon,
    Debt: Debt_Polygon,
    VotingPower: VP_Polygon,
  },
}

export const TOKENS_ARRAY: {
  [key: number]: Token[]
} = {
  [POLYGON]: [BASE, USDC, WBTC, DAI, SWAP],
}
