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
  address: '0x2fC8267952E7971fa3D2838Ac9e9ed5d45248209',
  decimals: 18,
  img: `${TOKENS_PATH}/otoken.png`,
  name: 'TRINO',
  symbol: 'TRINO',
  id: 'otoken',
}
const TOKEN_Polygon: Token = {
  address: '0x488aA4F1f43FD854823e8Ce38A34Fd2d877f5913',
  decimals: 18,
  img: `${TOKENS_PATH}/token.png`,
  name: 'XULTHUM',
  symbol: 'XULTHUM',
  id: 'token',
}

const VTOKEN_Polygon: Token = {
  address: '0x0407b5B793e6EE080e98e1Ac65Ed29363Be8F617',
  decimals: 18,
  img: `${TOKENS_PATH}/vtoken.png`,
  name: 'MINE',
  symbol: 'MINE',
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
