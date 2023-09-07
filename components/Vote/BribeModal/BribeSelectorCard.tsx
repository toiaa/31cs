import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon'
import ImageTokens from '@/components/ImageTokens'
import { BribeSelectorCardI } from '@/ts/interfaces'
import React, { useState } from 'react'
import TokensModal from './TokensModal'

const BribeSelectorCard = ({ bribe, bribes, onSelectItem }: BribeSelectorCardI) => {
  const { symbol } = bribe

  const [showModal, setShowModal] = useState(false)

  const onOpen = () => {
    setShowModal(true)
  }
  const onClose = () => {
    setShowModal(false)
  }

  return (
    <div className='w-full flex items-center justify-between bg-box-dark-neutral rounded-lg gap-4 p-2'>
      <p className='font-semibold text-md p-2'>{symbol}</p>
      <div
        onClick={onOpen}
        className='flex items-center gap-1 cursor-pointer hover:bg-box-pale-neutral transition-all p-2 rounded-lg'>
        <ImageTokens symbol={symbol} />
        <ArrowDownIcon />
      </div>
      {showModal && <TokensModal onClose={onClose} items={bribes} onSelectItem={onSelectItem} type='bribe' />}
    </div>
  )
}

export default BribeSelectorCard
