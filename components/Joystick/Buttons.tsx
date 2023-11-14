import useControls from '@/hooks/useControls'
import useMulticall from '@/hooks/useMulticall'
import { useStorePointer } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { useRouter } from 'next/router'
import React from 'react'
import PlaceTile from '../SingleGridV2/ControlPanel/PlaceTile'

const Buttons = () => {
  const router = useRouter()
  const { id: nftId } = router.query as { id: string }
  const { pointer } = useStorePointer()
  const { handleSaveSelection } = useControls({ nftId })
  const { isLoading } = useMulticall()
  const handleSelect = () => {
    if (pointer) {
      const { x, y } = pointer
      handleSaveSelection({ x, y })
    }
  }

  return (
    <section className='flex items-center h-full mb-4'>
      <div className='flex flex-col items-center relative'>
        <div className='joystick-btn' onClick={() => clearPixelSelect()}>
          Y
        </div>
        <p className='absolute right-3 top-8'>Clear</p>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col items-center relative'>
          <p className='absolute whitespace-nowrap bottom-7'>Change Color</p>
          <div className='joystick-btn'>X</div>
        </div>

        <div className='flex flex-col items-center relative'>
          <div onClick={handleSelect} className='joystick-btn'>
            B
          </div>
          <p className='absolute whitespace-nowrap top-8'>Select</p>
        </div>
      </div>
      <div className='flex flex-col items-center relative'>
        <PlaceTile isLoading={isLoading} />
        <p className='absolute left-3 top-8'>Place</p>
      </div>
    </section>
  )
}

export default Buttons
