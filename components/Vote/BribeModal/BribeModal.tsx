import ErrorMessage from '@/components/ErrorMessage'
import CreateBribeButton from '@/components/WebButtons/CreateBribeAction'
import { useStoreAccount, useStoreSwap } from '@/store'
import { BribeCardI, BribeModalI } from '@/ts/interfaces'
import { ADDRESS, Token } from '@/ts/types'
import { findRewardTokens, isSameAddress } from '@/utils/methods'
import { TOKENS_ARRAY } from '@/utils/tokens'
import React, { useState } from 'react'
import Button from '../../Button'
import TokenAmountCard from '../../SwapCard/TokenAmountCard'
import BribeSelectorCard from './BribeSelectorCard'

const BribeModal = ({ onClose, bribes }: BribeModalI) => {
  const { chainId } = useStoreAccount.getState()
  const [selectedBribe, setSelectedBribe] = useState(bribes[0])
  const { message } = useStoreSwap()

  const [selectedToken, setSelectedToken] = useState(
    () =>
      TOKENS_ARRAY[chainId].find(({ address }) =>
        isSameAddress(address as ADDRESS, selectedBribe.rewardTokens[0]),
      ) as Token,
  )
  const [isOpenList, setIsOpenList] = useState(false)

  const onSelectItem = (item: BribeCardI | Token) => {
    if ('bribeAddress' in item) {
      setSelectedBribe(item)
      const { rewardTokens } = item
      const newToken = TOKENS_ARRAY[chainId].find(({ address }) =>
        isSameAddress(address as ADDRESS, rewardTokens[0]),
      ) as Token
      setSelectedToken(newToken)
    } else {
      setSelectedToken(item)
      setIsOpenList(false)
    }
  }

  const onOpen = () => {
    setIsOpenList(true)
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-full max-w-xl'>
          {/*content*/}
          <div className='border border-box-dark-neutral rounded-lg shadow-lg relative flex flex-col w-full bg-box outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-xl font-bold'>New Bribe</h3>
            </div>
            {/*body*/}
            <div className='relative  flex flex-col gap-2 p-4'>
              <h4 className='text-lg font-semibold'>Select farm you want to bribe</h4>
              <BribeSelectorCard bribe={selectedBribe} bribes={bribes} onSelectItem={onSelectItem} />
            </div>
            <div className='flex flex-col gap-2 relative px-4'>
              <h4 className='text-lg font-semibold'>Select Token and Amount</h4>
              <TokenAmountCard
                currentAction='Bribe'
                currentOption='Bribe'
                inputKey='bribeValue'
                showPercentage
                token={selectedToken}
                inputToken={selectedToken}
                showTokenList={isOpenList}
                onOpenList={onOpen}
                items={findRewardTokens(chainId, selectedBribe.rewardTokens)}
                onSelectItem={onSelectItem}
              />
            </div>
            <div className='px-4 m-2 h-[40px]'>
              <ErrorMessage error={message} />
            </div>
            {/*footer*/}
            <div className='flex items-center justify-between px-4 pb-4'>
              <Button onClick={onClose}>Close</Button>
              <CreateBribeButton rewardToken={selectedToken} bribeAddress={selectedBribe.bribeAddress} />
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default BribeModal
