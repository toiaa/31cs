import { TokensNetworkInterface } from '@/ts/interfaces'
import { Token } from '@/ts/types'
import { IS_DEMO, POLYGON } from './constants'

const TOKENS_PATH = '/images/tokens'

const DEMO_BASE_Polygon: Token = {
  address: '0x1E9C07E3731981575717EE825e4d54C735925F50',
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
  address: '0x21C1289F81310397d9b1103F30eBa3279D5417de',
  decimals: 18,
  img: `${TOKENS_PATH}/otoken.png`,
  name: 'OTOKEN',
  symbol: 'OTOKEN',
  id: 'otoken',
}
const TOKEN_Polygon: Token = {
  address: '0x3b53Da4DE9B159e3EB70aC6763023f529ea89CA1',
  decimals: 18,
  img: `${TOKENS_PATH}/token.png`,
  name: 'TOKEN',
  symbol: 'TOKEN',
  id: 'token',
}

const VTOKEN_Polygon: Token = {
  address: '0xB12c1346E1e2FBadB12Deed34ff91ce4554d3276',
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
  name: 'Power',
  symbol: 'Power',
  id: 'votingPower',
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
  [POLYGON]: [BASE],
}
