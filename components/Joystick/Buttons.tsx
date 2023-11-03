import React from 'react'

const Buttons = () => {
  return (
    <section className='flex items-center h-full lg:pl-8 lg:pr-4 lg:py-14 pr-14 py-4'>
      <div className='flex items-center h-fit'>
        <div className='joystick-btn'>Y</div>
        <div className='flex flex-col'>
          <div className='joystick-btn'>X</div>
          <div className='p-3' />
          <div className='joystick-btn'>B</div>
        </div>
        <div className='joystick-btn'>A</div>
      </div>
    </section>
  )
}

export default Buttons
