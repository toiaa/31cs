import ImageTokens from '@/components/ImageTokens'
import { FarmCardHeaderInterface } from '@/ts/interfaces'
import React from 'react'

function FarmCardHeader({ tokens }: FarmCardHeaderInterface) {
  return (
    <div className='flex flex-col gap-1 px-2'>
      <p>{tokens}</p>
      <ImageTokens symbol={tokens} />
    </div>
  )
}

export default FarmCardHeader
