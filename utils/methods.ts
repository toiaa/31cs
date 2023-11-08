import { ActionType, AmountType, InputType, OptionType, TokensApproveType, TokensType } from '@/ts/types'
import { DEFAULT_NETWORK, PIXELS_TOTAL } from './constants'
import { NETWORKS_LIST } from './networks'
import { TOKENS } from './tokens'

const ONLY_NUMBER = /^[0-9]*\.?[0-9]*$/
const ONLY_LETTERS = /[a-zA-Z]/

/**
 * Formats an `amount` as a string with commas for the integer part and a period and `decimals` decimals (if any) for the decimal part.
 * @param {string} amount - The amount to format as a string.
 * @param {AmountType} type - The type of formatting to use ('price' for dollar formatting, 'percentage' for percentage formatting, or anything else for plain formatting).
 * @param {number} decimals - The number of decimal places to show in the formatted amount (defaults to 2 if not specified).
 * @returns {string} The formatted `amount` as a string.
 */
export const formatAmount = (amount: string, type: AmountType, decimals = 2): string => {
  try {
    const amountNum = Number(amount)
    let formatAmount = ''
    if (amount) {
      if (ONLY_LETTERS.test(amount)) return amount
      const hasDecimal = amount.includes('.')
      const [integerPart, decimalPart] = hasDecimal ? amount.split('.') : [amount, null]
      const decimalPartWithoutZero = decimalPart && decimalPart === '0' ? '' : decimalPart
      const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      const formattedDecimalPart = decimalPartWithoutZero ? `.${decimalPartWithoutZero.slice(0, decimals)}` : ''
      formatAmount = `${formattedIntegerPart}${formattedDecimalPart}`
      if (decimals === 3 && amountNum > 0 && amountNum < 0.001) {
        formatAmount = '<0.001'
      } else if (decimals === 2 && amountNum > 0 && amountNum < 0.01) {
        formatAmount = '<0.01'
      }

      if (type === 'price') return `$${formatAmount}`
      if (type === 'percentage') return `${formatAmount}%`
    }
    return formatAmount
  } catch {
    return ''
  }
}

/**
 * Format a numeric string input value to allow only valid number inputs
 * @param {string} value - The numeric string input value to format
 * @param {string} currentValue - The numeric string current value
 * @returns {string} - The formatted input value as a string
 */
export const formatInputValue = (value: string, currentValue: string): string => {
  if (['', '0'].includes(value)) {
    return '0'
  }

  if (value === '.') {
    return '0.'
  }

  const match = value.match(ONLY_NUMBER)

  if (match && match[0].length === value.length) {
    let newValue = value
    if (newValue.startsWith('0') && newValue.charAt(1) !== '.') {
      newValue = newValue.replace('0', '')
    }
    const decimalIndex = newValue.indexOf('.')
    if (decimalIndex !== -1 && newValue.substring(decimalIndex + 1).length > 18) {
      const lastItem = newValue.charAt(newValue.length - 1)
      newValue = newValue.substring(0, decimalIndex + 18).concat(lastItem)
    }

    return newValue
  }

  return currentValue
}

/**
Get the Network Id from the current connection
@param {number} chain - The current chain connected.
@returns {string} - The network Id connected or a default network (Mumbai) in case is not connected or on the list
*/
export const getNetwork = (chain: number): number => {
  if (!chain) return DEFAULT_NETWORK
  if (!NETWORKS_LIST.includes(chain)) return DEFAULT_NETWORK
  return chain
}

export const calculateAmountUSD = (amount: string, usd: string): string => {
  if (['0', '0.'].includes(amount)) return usd
  return (Number(amount) * Number(usd)).toString()
}

/**
Check if the input is disabled or not to use it
@param {ActionType} currentAction - The current action selected from the list: ["Swap","Options","Earn","Lend"]
@param {InputType} inputKey - The input selected to be disabled
@returns {boolean} - The status on the input
*/
export const isInputDisabled = (currentAction: ActionType, inputKey: InputType): boolean => {
  if (currentAction === 'Swap') return false
  if (currentAction === 'Options' && ['craftValue', 'outputValue'].includes(inputKey)) return true
  if (['Earn', 'Lend'].includes(currentAction) && inputKey === 'outputValue') return true
  return false
}

/**
 * Calculates the slippage tolerance for the Smart Contract.
 * @param {string} slippage - The current slippage value.
 * @returns {string} - The slippage tolerance to send on the Smart Contract. If slippage is less than 0, returns '0.1'; otherwise, returns calculated slippage tolerance.
 */
export const calculateSlippage = (slippage: string): string => {
  const DEFAULT_VALUE = (10000 - Number('0.3') * 100).toString()
  if (slippage === 'auto') return DEFAULT_VALUE
  if (Number(slippage) < 0.3) return DEFAULT_VALUE
  return (10000 - Number(slippage) * 100).toString()
}

/**
 * Get the timestamp on miliseconds to use on the Smart Contract
 * @returns {number} - The timestamps with 30 minutes
 */
export const getTimestamp = (): number => {
  const currentDate = new Date()
  const futureDate = new Date(currentDate.getTime() + 30 * 60 * 1000)
  return Math.round(futureDate.getTime() / 1000)
}

/**
 * Get the tokens to use on the Swap
 * @param {OptionType} type - The type action that could be OptionTypes.
 * @param {number} chainId - The current network Id.
 * @returns {Object} - An object with a inputToken and outputToken
 */
export const getTokensSwap = (type: OptionType, chainId: number): TokensType => {
  const { Credit, Debt, OTOKEN, TOKEN, WRAPPED, VTOKEN, VotingPower } = TOKENS[chainId]

  if (type === 'Buy') return { inputToken: WRAPPED, outputToken: TOKEN }
  if (type === 'Sell') return { inputToken: TOKEN, outputToken: WRAPPED }
  if (type === 'Exercise') return { inputToken: OTOKEN, outputToken: TOKEN }
  if (type === 'Redeem') return { inputToken: TOKEN, outputToken: WRAPPED }
  if (type === 'Borrow') return { inputToken: WRAPPED, outputToken: Debt }
  if (type === 'Repay') return { inputToken: WRAPPED, outputToken: Credit }
  if (type === 'Stake') return { inputToken: TOKEN, outputToken: VTOKEN }
  if (type === 'Unstake') return { inputToken: VTOKEN, outputToken: TOKEN }
  if (type === 'Burn') return { inputToken: OTOKEN, outputToken: VotingPower }

  return { inputToken: TOKENS[chainId].WRAPPED, outputToken: TOKENS[chainId].TOKEN }
}

/**
 * Get the allowance information for a specific action
 * @param {number} chainId - The current network Id.
 * @param {OptionType} actionSelected - The selected action.
 * @returns {Object} - An object with the allowance information.
 */
export const getAllowanceInfo = (chainId: number, actionSelected: OptionType) => {
  const { OTOKEN, TOKEN, WRAPPED, VTOKEN } = TOKENS[chainId]

  const TOKENS_APPROVE: TokensApproveType = {
    Buy: {
      requestApprove: true,
      tokensToApprove: { inputToken: WRAPPED, outputToken: TOKEN },
    },
    Sell: {
      requestApprove: true,
      tokensToApprove: { inputToken: TOKEN, outputToken: TOKEN },
    },
    Exercise: {
      requestApprove: true,
      tokensToApprove: {
        inputToken: OTOKEN,
        outputToken: TOKEN,
      },
      secondTokensToApprove: {
        inputToken: WRAPPED,
        outputToken: TOKEN,
      },
    },
    Redeem: {
      requestApprove: true,
      tokensToApprove: {
        inputToken: TOKEN,
        outputToken: TOKEN,
      },
    },
    Borrow: {
      requestApprove: false,
      tokensToApprove: getTokensSwap('Borrow', chainId),
    },
    Repay: {
      requestApprove: true,
      tokensToApprove: { inputToken: WRAPPED, outputToken: TOKEN },
    },
    Stake: {
      requestApprove: true,
      tokensToApprove: { inputToken: TOKEN, outputToken: VTOKEN },
    },
    Unstake: {
      requestApprove: false,
      tokensToApprove: { inputToken: VTOKEN, outputToken: VTOKEN },
    },
    Burn: {
      requestApprove: true,
      tokensToApprove: { inputToken: OTOKEN, outputToken: VTOKEN },
    },
    Wrap: {
      requestApprove: false,
      tokensToApprove: getTokensSwap('Wrap', chainId),
    },
    Unwrap: {
      requestApprove: false,
      tokensToApprove: getTokensSwap('Unrwap', chainId),
    },
  }

  return TOKENS_APPROVE[actionSelected]
}

/**
 * check if the value is greater than zero
 * @param {string} value - The value from the input
 * @returns {boolean} - Return a boolean if is greater or not
 */
export const isValid = (value: string) => Number(value) > 0

/**
 * Generates an array of random numbers in string format between "0" and "7".
 *
 * @param {number} length - The desired length of the generated array.
 * @returns {string[]} - An array containing random numbers as strings.
 */
export const generateRandomPixels = (colorLength: number) => {
  const numbersArray = []
  const probabilityOfZero = 0.6
  for (let i = 0; i < PIXELS_TOTAL; i++) {
    const randomNumber = Math.random()
    let number
    if (randomNumber < probabilityOfZero) {
      number = '0'
    } else {
      number = Math.floor(1 + Math.random() * colorLength).toString()
    }
    numbersArray.push(number)
  }
  return numbersArray
}
