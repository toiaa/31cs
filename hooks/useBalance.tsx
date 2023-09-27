import { DEFAULT_VALUE, useStoreBalance, useStoreTokensPrice } from '@/store'
import { TokenType } from '@/ts/types'

const useBalance = () => {
  const balances = useStoreBalance()
  const prices = useStoreTokensPrice()

  const getBalance = (id: TokenType) => {
    if (id !== 'external') return balances[id]

    return DEFAULT_VALUE
  }
  const getPrice = (id: TokenType) => {
    if (id !== 'external') return prices[id]
    return DEFAULT_VALUE
  }

  return { getBalance, getPrice }
}

export default useBalance
