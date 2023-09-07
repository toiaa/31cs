import { DEFAULT_VALUE, useStoreBalance, useStoreTokensBalance, useStoreTokensPrice } from '@/store'
import { TokenType } from '@/ts/types'

const useBalance = () => {
  const balances = useStoreBalance()
  const tokensBalance = useStoreTokensBalance()
  const isFull = Object.keys(tokensBalance).length > 0
  const prices = useStoreTokensPrice()

  const getBalance = (id: TokenType, symbol?: string) => {
    if (id !== 'external') return balances[id]
    if (id === 'external' && isFull && symbol) return tokensBalance[symbol]
    return DEFAULT_VALUE
  }
  const getPrice = (id: TokenType) => {
    if (id !== 'external') return prices[id]
    return DEFAULT_VALUE
  }

  return { getBalance, getPrice }
}

export default useBalance
