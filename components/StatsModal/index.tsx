import { useModalStats } from '@/store'
import { toggleStatsModal } from '@/store/methods'
import React from 'react'
import Button from '../Button'

const StatsModal = () => {
  const { isOpen } = useModalStats()

  return (
    <div
      className={`w-full h-full bg-modal-neutral absolute flex flex-col ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } transition-all duration-500 ease-in-out`}>
      <div className='flex items-start justify-start p-3 border-b border-solid border-slate-200'>
        <h3 className='text-lg font-semibold'>Stats Information</h3>
      </div>
      <div className='p-3 flex flex-col gap-2 flex-1'>Add some Stats Info Here</div>
      <div className='flex items-center justify-center py-2 '>
        <Button isSecondary onClick={() => toggleStatsModal(true)}>
          Close
        </Button>
      </div>
    </div>
  )
}

export default StatsModal
