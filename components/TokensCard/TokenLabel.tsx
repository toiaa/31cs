import { TokenLabelType } from '@/ts/types'
import { TOOLTIPS_TOKEN_CARD } from '@/utils/constants'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'

const TooltipQuestion = dynamic(() => import('../TooltipQuestion'))

const TokenLabel = ({ symbol, img, id }: TokenLabelType) => {
  const SIZE = 36

  return (
    <div className='flex gap-2 w-[140px] justify-start items-center'>
      <Image src={img} alt='token' width={SIZE} height={SIZE} />
      <p className='font-semibold '>{symbol}</p>
      {TOOLTIPS_TOKEN_CARD[id] && <TooltipQuestion text={TOOLTIPS_TOKEN_CARD[id]} />}
    </div>
  )
}

export default TokenLabel
