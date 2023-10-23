import {
  DEFAULT_VALUE,
  useStoreAccount,
  useStoreAction,
  useStoreInput,
  useStoreSettings,
  useStoreStats,
  useStoreSwap,
} from '@/store'
import { getStatus } from '@/store/methods'
import { ADDRESS, ApproveType, OptionType, SettingsTabsType, TransactionType } from '@/ts/types'
import base_abi from '@/utils/abis/base.json'
import grid_abi from '@/utils/abis/grid.json'
import abi_multicall from '@/utils/abis/multicall.json'
import token_abi from '@/utils/abis/token.json'
import abi_tokenReward from '@/utils/abis/tokenRewarder.json'
import { ExternalProvider } from '@ethersproject/providers'
import { ethers, BigNumber } from 'ethers'
import { MulticallWrapper } from 'ethers-multicall-provider'
import debounce from 'lodash/debounce'
import {
  CONTRACTS,
  CONTRACT_FUNCTIONS_BUY,
  CONTRACT_FUNCTIONS_SELL,
  CONTRACT_ZERO,
  OPTIONS_FUNCTIONS,
  MINT_AMOUNT,
  POLYGON,
} from './constants'
import { getTimestamp } from './methods'
import { NETWORK_RPC } from './networks'
import { TOKENS } from './tokens'

/**
 * get a fallback provider to avoid max limit calls on one RPC.
 * @returns  - A FallbackProvider
 */
export const getProvider = () => {
  const ankerProvider = new ethers.providers.JsonRpcProvider(NETWORK_RPC[POLYGON][0])
  // const maticvigilProvider = new ethers.providers.JsonRpcProvider(NETWORK_RPC[POLYGON][1])
  // const blastProvider = new ethers.providers.JsonRpcProvider(NETWORK_RPC[POLYGON][2])
  // const provider = new providers.FallbackProvider([ankerProvider, maticvigilProvider, blastProvider])

  return ankerProvider
}

/**
 * Retrieves the gas price based on the selected transaction speed.
 *
 * @param signer The JSON-RPC signer object.
 * @param txSpeed The selected transaction speed (SettingsTabsType).
 * @returns The adjusted gas price as a BigNumber.
 */
const getGasPrice = async (
  signer: ethers.providers.JsonRpcSigner,
  txSpeed: SettingsTabsType,
): Promise<BigNumber | null> => {
  const gasPrice = await signer.getGasPrice()
  const gasPriceBN = BigNumber.from(gasPrice)
  const DIV_AMOUNT = 100
  if (txSpeed.id === 0) return gasPriceBN
  if (txSpeed.id === 1) return gasPriceBN.mul(125).div(DIV_AMOUNT) // Increase the value by 25%
  if (txSpeed.id === 2) return gasPriceBN.mul(150).div(DIV_AMOUNT) // Increase the value by 50%
  if (txSpeed.id === 3) return null // Auto Market Gas
  return gasPriceBN
}

/**
 * Sets the quote for buying or selling based on the provided parameters.
 *
 * @param {number} chainId - The chain ID.
 * @param {string} amount - The amount for the quote.
 * @param {string} slippageTolerance - The slippage tolerance.
 * @param {boolean} isInput - Indicates if the quote is for the input value or outputValue.
 * @param {boolean} isBuy - Indicates if it's a buy quote or sell.
 * @param {BigNumber} balance - The balance from the user.
 */
export const setQuote = async (
  chainId: number,
  amount: string,
  slippageTolerance: string,
  isInput: boolean,
  isBuy: boolean,
  balance: BigNumber,
) => {
  // Determine the key based on whether it's an input or output value
  const key = isInput ? 'outputValue' : 'inputValue'
  const { parseEther, formatEther } = ethers.utils
  const parsedAmount = parseEther(amount)
  const { maxMarketSell } = useStoreStats.getState()
  const { slippage } = useStoreSettings.getState()
  const { message } = useStoreSwap.getState()
  let isMoreThanMarketSell = false
  let isMoreThanSlippage = false

  if (!isBuy && message === '') {
    isMoreThanMarketSell = getStatus(amount, maxMarketSell, 'sell')
  }

  if ((isInput && parsedAmount.eq(DEFAULT_VALUE)) || (isInput && parsedAmount.gt(balance))) {
    useStoreInput.setState({ [key]: amount })
  } else if (!isMoreThanMarketSell) {
    const provider = getProvider()
    const contractMethods = isBuy ? CONTRACT_FUNCTIONS_BUY : CONTRACT_FUNCTIONS_SELL
    const contract_function = isInput ? contractMethods[0] : contractMethods[1]
    const tokenContract = new ethers.Contract(CONTRACTS[chainId].multicall, abi_multicall, provider)
    const [output, currentSlippage, minOutput, autoMinOutput] = await tokenContract[contract_function](
      parsedAmount,
      slippageTolerance,
    )
    const formatOutput = formatEther(output)
    const formatSlippage = formatEther(currentSlippage)
    const slippageValue = slippage.id === 2 ? (Number(slippageTolerance) + 1).toString() : slippage.value
    const parsedSlippage = parseEther(slippageValue)

    if (message === '') {
      isMoreThanSlippage = getStatus(formatSlippage, parsedSlippage, 'loss')
    }

    if (!isInput && !isMoreThanSlippage) {
      getStatus(formatOutput, balance, 'balance')
    }

    useStoreInput.setState({ [key]: formatOutput })
    useStoreAction.setState({ minAmount: minOutput, autoMinOutput: BigNumber.from(autoMinOutput) })
    useStoreSettings.setState({ slippageToletance: formatSlippage })
  }
}

// Apply debounce to the setQuote function
export const debouncedSetQuote = debounce(setQuote, 500)

/**
 * Retrieves the allowance value of a token for a user account.
 *
 * @param chainId The chain ID where the token contract resides.
 * @param tokenAddress The address of the token contract.
 * @param userAddress The address of the user account.
 * @param spenderAddress The address of the contract or account authorized to spend the tokens.
 * @returns The allowance value of the token for the user account.
 */
export const checkAllowance = async (tokenAddress: string, userAddress: string, spenderAddress: string) => {
  try {
    const provider = getProvider()
    const tokenContract = new ethers.Contract(tokenAddress, token_abi, provider)
    const allowance: BigNumber = await tokenContract.allowance(userAddress, spenderAddress)
    return allowance
  } catch {
    return BigNumber.from('0')
  }
}

/**
 * Approves a certain amount of tokens to be spent by a specific contract or account.
 *
 * @param tokens The tokens object containing input and output token addresses.
 * @param amountParsed The amount of tokens to approve for spending.
 * @returns An object containing the transaction and any error that occurred.
 */
export const approve = async ({ contractAddress, spenderAddress }: ApproveType, amountParsed: BigNumber) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(contractAddress, token_abi, signer)
    const tx: TransactionType = await tokenContract.approve(spenderAddress, amountParsed)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

/**
 * Performs a buy or sell action with a specified amount.
 *
 * @param amount The amount of tokens to buy or sell.
 * @param action The type of action to perform (buy or sell).
 * @returns An object containing the transaction and any error that occurred.
 */
export const buy_sell = async (amountParsed: BigNumber, action: OptionType) => {
  const call_function = OPTIONS_FUNCTIONS[action]
  const { address, chainId } = useStoreAccount.getState()
  const { txSpeed, slippage } = useStoreSettings.getState()
  const { minAmount, autoMinOutput } = useStoreAction.getState()
  const selectedAmount = slippage.id === 2 ? autoMinOutput : minAmount
  const timestamp = getTimestamp()
  const tokenAddress = TOKENS[chainId].TOKEN.address as ADDRESS
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const gasPrice = await getGasPrice(signer, txSpeed)
    const contract = new ethers.Contract(tokenAddress, token_abi, signer)
    const tx: TransactionType = await contract[call_function](
      amountParsed,
      selectedAmount,
      timestamp,
      address,
      CONTRACT_ZERO,
      {
        gasPrice,
      },
    )
    return { tx, error: null }
  } catch (error) {
    return { tx: null, error: 'Error' }
  }
}

/**
 * Performs a swap action with a specified amount.
 *
 * @param amount The amount of tokens to buy or sell.
 * @param action The type of action to perform (buy or sell).
 * @returns An object containing the transaction and any error that occurred.
 */
export const swap_action = async (amount: string, action: OptionType) => {
  const call_function = OPTIONS_FUNCTIONS[action]
  const { txSpeed } = useStoreSettings.getState()
  const isVtoken = ['Stake', 'Unstake', 'Burn'].includes(action)
  const needAddress = ['Exercise', 'Redeem'].includes(action)
  const isBurn = ['Burn'].includes(action)
  const { address, chainId } = useStoreAccount.getState()
  const { TOKEN, VTOKEN } = TOKENS[chainId]
  const tokenAddress = TOKEN.address as ADDRESS
  const vTokenAddress = VTOKEN.address as ADDRESS
  const parsedAmount = ethers.utils.parseEther(amount)
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const gasPrice = await getGasPrice(signer, txSpeed)
    let contract: ethers.Contract | null = null
    if (isVtoken) {
      contract = new ethers.Contract(vTokenAddress, abi_tokenReward, signer)
    } else {
      contract = new ethers.Contract(tokenAddress, token_abi, signer)
    }
    let tx: TransactionType
    if (needAddress) {
      tx = await contract[call_function](parsedAmount, address, {
        gasPrice,
      })
    } else if (isBurn) {
      tx = await contract[call_function](address, parsedAmount, {
        gasPrice,
      })
    } else {
      tx = await contract[call_function](parsedAmount, {
        gasPrice,
      })
    }
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

/**
 * Mint tests tokens for a user.
 *
 * @param tokenAddress The address of the base token contract.
 * @param userAddress The address of the user.
 * @returns An object containing the transaction and any error that occurred.
 */
export const mintToken = async (tokenAddress: string, userAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(tokenAddress, base_abi, signer)
    const tx: TransactionType = await tokenContract.mint(userAddress, MINT_AMOUNT)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

/**
 * Harvest rewards tokens for a user.
 *
 * @param contractAddress The address of the rewards contract.
 * @param userAddress The address of the user.
 * @returns An object containing the transaction and any error that occurred.
 */
export const harvest = async (contractAddress: string, userAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi_tokenReward, signer)
    const tx: TransactionType = await contract.getReward(userAddress)
    return { tx, error: null }
  } catch {
    return { tx: null, error: 'Error' }
  }
}

/**
 * Get the Multicall data and the Portafolio Data with rewards from the blockchain.
 * @param {string} userAddress - The current address connected.
 * @param {number} chainId - The current network Id.
 * @returns {BigNumber[]} - An object with multicallData and porfolioData.
 */

export const getMulticallData = async (userAddress: ADDRESS, chainId: number) => {
  const provider = getProvider()
  MulticallWrapper.isMulticallProvider(provider)
  const contract = new ethers.Contract(CONTRACTS[chainId].multicall, abi_multicall, provider)
  const bondingDataPromise = contract.bondingCurveData(userAddress)
  const portfolioDataPromise = contract.portfolioData(userAddress)

  const [multicallData, portfolioData]: [BigNumber[], BigNumber[]] = await Promise.all([
    bondingDataPromise,
    portfolioDataPromise,
  ])

  return { multicallData, portfolioData }
}

export const getNftGallery = async (userAddress: ADDRESS, chainId: number) => {
  const provider = getProvider()
  const gridNftContract = new ethers.Contract(CONTRACTS[chainId].gridNFT, grid_abi, provider)
  const lengthGridNFT: BigNumber = await gridNftContract.totalSupply()
  const totalGridsNFT = Number(lengthGridNFT.toString())
  const svgDataPromises = Array.from(Array(totalGridsNFT).keys()).map((nftId) => {
    try {
      const svgData = gridNftContract.tokenURI(BigInt(nftId))
      return svgData
    } catch (error) {
      return { error: 'Error fetching grid SVG data for NFTs' }
    }
  })
  const svgGridData = await Promise.all(svgDataPromises)
  return { svgGridData }
}

export const getSingleGridData = async (userAddress: ADDRESS, chainId: number, nftId: string) => {
  const provider = getProvider()
  const gridNftContract = new ethers.Contract(CONTRACTS[chainId].gridNFT, grid_abi, provider)
  try {
    const svgData = await gridNftContract.getGrid(BigInt(nftId))
    return { svgData }
  } catch (error) {
    return { error: 'error fetching single grid view pixels' }
  }
}
