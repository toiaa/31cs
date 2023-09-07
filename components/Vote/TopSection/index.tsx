import Button from '@/components/Button'
import { useState } from 'react'
import ClaimModal from '../ClaimModal'
import VoteStats from './VoteStats'

const TopSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenRewardsModal = () => {
    setIsOpen(true)
  }
  const handleCloseRewardsModal = () => {
    setIsOpen(false)
  }
  return (
    <div className='flex gap-6 w-full items-center'>
      {isOpen && <ClaimModal onClose={handleCloseRewardsModal} />}
      <VoteStats />
      <div className='w-full flex justify-end'>
        <Button onClick={handleOpenRewardsModal}>Claim voting rewards </Button>
      </div>
    </div>
  )
}

export default TopSection
