import { useStoreAccount } from '@/store'
import { TOKENS_ARRAY } from '@/utils/tokens'
import Image from 'next/image'
import React from 'react'

const ImageTokens = ({ symbol, strictFilter = false }: { symbol: string; strictFilter?: boolean }) => {
  const { chainId } = useStoreAccount.getState()
  const tokens_pairs = TOKENS_ARRAY[chainId]
    .filter((token) => (strictFilter ? token.symbol === symbol : symbol.includes(token.symbol)))
    .sort((a, b) => {
      const symbolA = a.symbol.toUpperCase()
      const symbolB = b.symbol.toUpperCase()
      if (symbolA < symbolB) {
        return -1
      }
      if (symbolA > symbolB) {
        return 1
      }
      return 0
    })

  return (
    <div className='flex gap-[3px]'>
      {tokens_pairs.map((token, i) => (
        <Image key={`${token}-${i}-item`} src={token.img} alt='egg' width={30} height={30} />
      ))}
    </div>
  )
}

export default ImageTokens
