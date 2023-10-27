import { useStoreAccount } from '@/store'
import { CONTRACT_ZERO } from '@/utils/constants'
import React from 'react'
import Amount from '../Amount'

const TilesStats = () => {
  const { address } = useStoreAccount()
  const noWallet = !address || address === CONTRACT_ZERO
  return (
    <div className='flex flex-col p-3 w-full h-[210px] bg-box items-center justify-around border border-button-main-light rounded '>
      {noWallet && (
        <div className='flex flex-col items-center justify-center w-full border border-button-secondary-color p-2 rounded bg-button-main-border bg-opacity-20'>
          <p className='text-base text-center'>Connect Wallet to see your stats</p>
        </div>
      )}

      {!noWallet && (
        <>
          <div className='flex flex-col'>
            <p className='text-md'>343 oTOKENweek</p>
            <div className='flex items-center text-gray-subtitle '>
              <span>≈</span>
              <Amount amount='0' type='price' color='#818995' />
              <p>/week</p>
            </div>
          </div>
          <p className='text-md'>112 Tiles Owned</p>
          <p className='text-md'>600 Tiles Placed</p>
        </>
      )}
    </div>
  )
}

export default TilesStats
