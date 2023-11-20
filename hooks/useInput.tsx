import { useStoreAccount, useStoreInput, useStoreSettings } from '@/store'
import { ActionType, InputType, OptionType } from '@/ts/types'
import { calculateSlippage, getTokensSwap, isValid } from '@/utils/methods'
import { optionValue, setQuote } from '@/utils/web3Methods'
import { useEffect } from 'react'
import useBalance from './useBalance'

const useInput = (actionKey?: ActionType, optionKey?: OptionType, inputKey?: InputType) => {
  const { craftValue, inputValue, outputValue, activeValue } = useStoreInput()
  const { chainId } = useStoreAccount()
  const { slippage } = useStoreSettings()
  const { getBalance } = useBalance()

  /**
   * Swaps the input or output value based on the selected option.
   *
   * @param {OptionType} optionKey - The selected option ('Buy' or 'Sell').
   * @param {InputType} inputKey - The input key ('inputValue' or 'outputValue').
   * @param {string} value - The new value to set.
   */
  const swapAction = async (optionKey: OptionType, inputKey: InputType, value: string, isInterval?: boolean) => {
    const { debouncedSetQuote } = await import('@/utils/web3Methods')
    const slippageTolerance = calculateSlippage(slippage.value)
    const { inputToken } = getTokensSwap(optionKey, chainId)
    const inputBalance = getBalance(inputToken.id)
    const currentSetQuote = isInterval ? setQuote : debouncedSetQuote

    if (optionKey === 'Buy') {
      if (inputKey === 'inputValue') {
        useStoreInput.setState({ inputValue: value, activeValue: 'inputValue', craftValue: value })
        await currentSetQuote(chainId, value, slippageTolerance, true, true, inputBalance, optionKey)
      }
      if (inputKey === 'outputValue') {
        useStoreInput.setState({ outputValue: value, activeValue: 'outputValue' })
        await currentSetQuote(chainId, value, slippageTolerance, false, true, inputBalance, optionKey)
      }
    }
    if (optionKey === 'Sell') {
      if (inputKey === 'inputValue') {
        useStoreInput.setState({ inputValue: value, activeValue: 'inputValue', craftValue: value })
        await currentSetQuote(chainId, value, slippageTolerance, true, false, inputBalance, optionKey)
      }
      if (inputKey === 'outputValue') {
        useStoreInput.setState({ outputValue: value, activeValue: 'outputValue', craftValue: value })
        await currentSetQuote(chainId, value, slippageTolerance, false, false, inputBalance, optionKey)
      }
    }
  }

  /**
   * Update the input, output and craft value.
   *
   * @param {string} value - The new value to set.
   */
  const staticAction = async (value: string) => {
    useStoreInput.setState({ inputValue: value, craftValue: value, outputValue: value, activeValue: 'inputValue' })
  }

  /**
   * Update the input, output and craft value.
   *
   * @param {string} value - The new value to set on Option.
   */
  const optionAction = async (optionKey: OptionType, value: string, inputKey: InputType) => {
    if (['Redeem', 'Exercise'].includes(optionKey)) {
      useStoreInput.setState({
        inputValue: optionValue(value, inputKey, 'inputValue'),
        craftValue: optionValue(value, inputKey, 'craftValue'),
        outputValue: optionValue(value, inputKey, 'outputValue'),
        activeValue: 'inputValue',
      })
    }
  }

  const resetInputs = () => {
    useStoreInput.setState({ inputValue: '0', outputValue: '', activeValue: 'inputValue', craftValue: '' })
  }

  const setValue = async (actionKey: ActionType, optionKey: OptionType, inputKey: InputType, value: string) => {
    // Check what type of Action is:
    if (actionKey === 'Swap') {
      await swapAction(optionKey, inputKey, value)
    }
    if (actionKey === 'Options') {
      await optionAction(optionKey, value, inputKey)
    }
    if (['Earn', 'Lend', 'Wrap'].includes(actionKey)) {
      await staticAction(value)
    }
  }

  const getValue = (inputKey: InputType) => {
    if (inputKey === 'inputValue') return inputValue
    if (inputKey === 'craftValue') return craftValue
    if (inputKey === 'outputValue') return outputValue
    return ''
  }

  useEffect(() => {
    if (actionKey === 'Swap' && optionKey && inputKey === activeValue && isValid(inputValue)) {
      const value = activeValue === 'inputValue' ? inputValue : outputValue
      const intervalSwap = () => {
        swapAction(optionKey, inputKey, value, true)
      }
      const intervalId = setInterval(intervalSwap, 5000)
      return () => {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionKey, inputKey, activeValue, inputValue, outputValue, optionKey])

  return { getValue, setValue, activeValue, resetInputs }
}

export default useInput
