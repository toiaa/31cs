import useControls from '@/hooks/useControls'
import { useStorePointer } from '@/store'
import { useRouter } from 'next/router'
import React from 'react'

const Buttons = () => {
  const router = useRouter()
  const { id: nftId } = router.query as { id: string }
  const { pointer } = useStorePointer()
  const { handleSaveSelection } = useControls({ nftId })

  const handleSelect = () => {
    if (pointer) {
      const { x, y } = pointer
      handleSaveSelection({ x, y })
    }
  }

  return (
    <section className='flex items-center h-full mb-4'>
      <div className='flex flex-col items-center relative'>
        <div className='joystick-btn'>Y</div>
        <p className='absolute right-3 top-10'>Clear</p>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center relative'>
          <p className='absolute whitespace-nowrap bottom-9'>Change Color</p>
          <div className='joystick-btn'>X</div>
        </div>

        <div className='flex flex-col items-center relative'>
          <div onClick={handleSelect} className='joystick-btn'>
            B
          </div>
          <p className='absolute whitespace-nowrap top-10'>Select</p>
        </div>
      </div>
      <div className='flex flex-col items-center relative'>
        <div className='joystick-btn'>A</div>
        <p className='absolute left-3 top-10'>Place</p>
      </div>
    </section>
  )
}

export default Buttons
