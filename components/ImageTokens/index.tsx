import { useStoreAccount } from '@/store'
import { TOKENS_ARRAY } from '@/utils/tokens'
import Image from 'next/image'
import React from 'react'

const ImageTokens = ({ symbol }: { symbol: string }) => {
  const { chainId } = useStoreAccount.getState()
  const tokens = TOKENS_ARRAY[chainId]
    .filter((token) => symbol.includes(token.symbol))
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
      {tokens.map((token, i) => (
        <Image key={`${token}-${i}-item`} src={token.img} alt='egg' width={30} height={30} />
      ))}
    </div>
  )
}

export default ImageTokens
