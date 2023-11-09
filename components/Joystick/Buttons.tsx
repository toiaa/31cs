import dynamic from 'next/dynamic'
import React from 'react'

const Tooltip = dynamic(() => import('../Tooltip'), {
  ssr: false,
})

const Buttons = () => {
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
          <Tooltip position='down' text='Back'>
            <div className='joystick-btn'>B</div>
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
