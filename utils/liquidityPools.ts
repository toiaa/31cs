import { Token } from '@/ts/types'

// This file is only for the Mint tokens. On Production, this is not going to be required
// Also on the tokens, we only need the BASE to mint. On production is also going to be gone.

//AMM0: Solidly
const vLP_USDC_WETH: Token = {
  address: '0x52a7648f60f672B93921504b0A90e3F6Cf8d3EC7',
  decimals: 18,
  img: '',
  name: 'vLP-USDC/WETH',
  symbol: 'vLP-USDC/WETH',
  id: 'external',
}
const vLP_DAI_WETH: Token = {
  address: '0xe35157B66067018275C64AF7d76BF18263857349',
  decimals: 18,
  img: '',
  name: 'vLP-DAI/WETH',
  symbol: 'vLP-DAI/WETH',
  id: 'external',
}
const vLP_WBTC_WETH: Token = {
  address: '0x1AC70c868628c5027D69AF4EE891F549B4F9DD32',
  decimals: 18,
  img: '',
  name: 'vLP-WBTC/WETH',
  symbol: 'vLP-WBTC/WETH',
  id: 'external',
}
const sLP_DAI_USDC: Token = {
  address: '0x25a12591e63a4367e5fB3Af66cc4CDDB7F02aDec',
  decimals: 18,
  img: '',
  name: 'sLP-DAI/USDC',
  symbol: 'sLP-DAI/USDC',
  id: 'external',
}

//AMM1: UniswapV2 Masterchef
const LP_USDC_WETH: Token = {
  address: '0x446d53082A967c037189fcf289DC1D87402085eB',
  decimals: 18,
  img: '',
  name: 'LP-USDC/WETH',
  symbol: 'LP-USDC/WETH',
  id: 'external',
}

const LP_DAI_WETH: Token = {
  address: '0x2FFdF4d09ca6473CE4Eddb47371FC098FE758c52',
  decimals: 18,
  img: '',
  name: 'LP-DAI/WETH',
  symbol: 'LP-DAI/WETH',
  id: 'external',
}
const LP_WBTC_WETH: Token = {
  address: '0x5D1dd559fdA41D45a7e9A3cbF85FdeA0298A892f',
  decimals: 18,
  img: '',
  name: 'LP-WBTC/WETH',
  symbol: 'LP-WBTC/WETH',
  id: 'external',
}
const LP_DAI_USDC: Token = {
  address: '0x906f3f487E13a8E4bD78294DBeB77e284b668CFf',
  decimals: 18,
  img: '',
  name: 'LP-DAI/USDC',
  symbol: 'LP-DAI/USDC',
  id: 'external',
}

//AMM2: UniswapV3 Managed
const mLP_USDC_WETH: Token = {
  address: '0x7613AB6a8cAeaa28f861B9842BD85C0670554D67',
  decimals: 18,
  img: '',
  name: 'mLP-USDC/WETH',
  symbol: 'mLP-USDC/WETH',
  id: 'external',
}
const mLP_DAI_WETH: Token = {
  address: '0x1fD253Bca6d8ba56692Bb2dCBB9e060eE2b07C10',
  decimals: 18,
  img: '',
  name: 'mLP-DAI/WETH',
  symbol: 'mLP-DAI/WETH',
  id: 'external',
}

const mLP_WBTC_WETH: Token = {
  address: '0xA8408837ec5FDA0F54aDe6A03322999EC7b49C32',
  decimals: 18,
  img: '',
  name: 'mLP-WBTC/WETH',
  symbol: 'mLP-WBTC/WETH',
  id: 'external',
}
const mLP_DAI_USDC: Token = {
  address: '0x402CB96EE2e0694834d2fE04075BA3618776Fcd1',
  decimals: 18,
  img: '',
  name: 'mLP-DAI/USDC',
  symbol: 'mLP-DAI/USDC',
  id: 'external',
}

export const LP_TEST = [
  vLP_USDC_WETH,
  vLP_DAI_WETH,
  vLP_WBTC_WETH,
  sLP_DAI_USDC,
  LP_USDC_WETH,
  LP_DAI_WETH,
  LP_WBTC_WETH,
  LP_DAI_USDC,
  mLP_USDC_WETH,
  mLP_DAI_WETH,
  mLP_WBTC_WETH,
  mLP_DAI_USDC,
]
