import { useStoreAccount } from '@/store'
import { POLYGON } from '@/utils/constants'
import { TOKENS } from '@/utils/tokens'
import Image from 'next/image'
import React from 'react'
import Amount from '../Amount'
import Button from '../Button'

const SIZE = 20

const ClaimBox = () => {
  const { WRAPPED } = TOKENS[POLYGON]
  const { address } = useStoreAccount()
  const shotAccount = `${address.slice(0, 4)}...${address.slice(-4)}`
  return (
    <div className='flex w-full justify-between items-center p-4 border border-1 border-gray-borders rounded-lg'>
      <div className='flex flex-col w-full'>
        <div className='flex gap-1 items-center'>
          <p className='font-semibold'>{shotAccount}</p>
          <p className='text-sm text-gray-subtitle'>will receive</p>
        </div>
        <div className='flex gap-1 items-center'>
          <Amount amount='1002.23' weight='semibold' type='number' />
          <Image src={WRAPPED.img} alt='token' width={SIZE} height={SIZE} />
        </div>
      </div>
      <Button notMinW>Start claim proccess</Button>
    </div>
  )
}

export default ClaimBox
