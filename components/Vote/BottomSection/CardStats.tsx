import Button from '@/components/Button'
import { useStoreBribes } from '@/store'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import InformationVote from './InformationVote'

const Chart = dynamic(() => import('./Chart'))
const BribeModal = dynamic(() => import('../BribeModal/BribeModal'))

const CardStats = () => {
  const [showModal, setShowModal] = useState(false)
  const { bribes } = useStoreBribes()

  const onOpen = () => {
    setShowModal(true)
  }
  const onClose = () => {
    setShowModal(false)
  }

  return (
    <div className='flex flex-col w-full p-2'>
      <div className='flex w-full items-start justify-between'>
        <InformationVote />

        <Button onClick={onOpen} notMinW icon={<AiOutlinePlusCircle size='24px' />}>
          New Bribe
        </Button>
      </div>

      {bribes.length > 0 && <Chart />}
      {showModal && bribes.length > 0 && <BribeModal onClose={onClose} bribes={bribes} />}
    </div>
  )
}

export default CardStats
