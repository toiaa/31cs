import useControls from '@/hooks/useControls'
import useMulticall from '@/hooks/useMulticall'
import { useStorePointer } from '@/store'
import { clearPixelSelect, handleChangeColor } from '@/store/methods'
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
    <section className='flex flex-col h-full mb-4 gap-2'>
      <div className='flex gap-2'>
        <div className='joystick-btn' onClick={() => clearPixelSelect()}>
          Clear
        </div>
        <div className='joystick-btn' onClick={() => handleChangeColor()}>
          Color
        </div>
      </div>
      <div className='flex ml-4 gap-2'>
        <div className='flex  items-center relative gap-2'>
          <PlaceTile isLoading={isLoading} />
        </div>
        <div onClick={handleSelect} className='joystick-btn'>
          Select
        </div>
      </div>
    </section>
  )
}

export default Buttons
