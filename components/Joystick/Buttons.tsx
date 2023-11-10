import useControls from '@/hooks/useControls'
import { useStorePointer } from '@/store'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'

const Tooltip = dynamic(() => import('../Tooltip'), {
  ssr: false,
})

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
    <section className='flex items-center h-full lg:pl-4 pl-0'>
      <div className='flex items-center h-fit'>
        <Tooltip position='left' text='Open Stats'>
          <div className='joystick-btn'>Y</div>
        </Tooltip>
        <div className='flex flex-col'>
          <Tooltip position='up' text='Change Color'>
            <div className='joystick-btn'>X</div>
          </Tooltip>
          <div className='p-3' />
          <Tooltip position='down' text='Select'>
            <div onClick={handleSelect} className='joystick-btn'>
              B
            </div>
          </Tooltip>
        </div>
        <Tooltip position='right' text='Place'>
          <div className='joystick-btn'>A</div>
        </Tooltip>
      </div>
    </section>
  )
}

export default Buttons
