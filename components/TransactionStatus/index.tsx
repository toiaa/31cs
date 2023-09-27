import Button from '@/components/Button'
import useTransaction from '@/hooks/useTransaction'
import { useStoreAction, useStoreAccount } from '@/store'
import { NETWORK_SCAN } from '@/utils/networks'
import React from 'react'
import Information from './Information'

const TransactionStatus = () => {
  const { txError, txLoading, txPrepared, txSuccess, hash, resetTransaction } = useTransaction()
  const { chainId } = useStoreAccount.getState()
  const { actionSelected } = useStoreAction()
  const onClose = () => {
    resetTransaction()
  }
  const renderData = () => {
    if (txError)
      return (
        <div>
          <p className='text-center'>Trascation Failed. Please Try Again</p>
        </div>
      )
    if (txSuccess && hash)
      return (
        <div>
          <p className='text-center'>
            Trascation Completed. Check it on the{' '}
            <span className='text-blue-400 font-semibold hover:text-blue-200'>
              <a href={`${NETWORK_SCAN[chainId]}${hash}`} target='_blank'>
                explorer
              </a>
            </span>
          </p>
        </div>
      )
    if (txLoading)
      return (
        <div className='flex w-full justify-center flex-col items-center gap-3'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-20 w-20' />
          <p className='text-center'>Transaction submitted, awaiting confirmation</p>
        </div>
      )
    if (txPrepared)
      return (
        <div className='flex w-full justify-center flex-col items-center gap-3'>
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-20 w-20' />
          <p>Trascation Prepared. Please Confirm on your Wallet</p>
        </div>
      )
  }
  return (
    <div
      className={`absolute p-10 right-0 top-0 ${
        txPrepared ? 'z-10 bg-modal-neutral h-full w-full opacity-1' : 'z-[-15] h-full w-full opacity-0'
      } rounded-lg transition-all duration-700`}>
      <div className='w-full flex flex-col justify-center items-center h-full gap-3'>
        <h3 className='text-lg font-bold '>{`${actionSelected} Information`}</h3>

        <Information />
        {renderData()}

        {(txSuccess || txError) && <Button onClick={onClose}>Close</Button>}
      </div>
    </div>
  )
}

export default TransactionStatus
