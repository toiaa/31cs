import React from 'react'

const Arrows = () => {
  return (
    <section className='flex items-center h-fit lg:pl-4 lg:pr-8 lg:py-14 py-4'>
      <div className='w-12 h-6 bg-[#D9D9D9] border transform transition-transform active:scale-95 active:shadow-xl cursor-pointer'>
        {/* Boton Izquierdo */}
      </div>
      <div className='flex flex-col'>
        <div className='w-6 h-12 bg-[#D9D9D9] transform transition-transform active:scale-95 active:shadow-xl cursor-pointer'>
          {/* Boton Arriba */}
        </div>
        <div className='p-3' />
        <div className='w-6 h-12 bg-[#D9D9D9] transform transition-transform active:scale-95 active:shadow-xl cursor-pointer'>
          {/* Boton Abajo */}
        </div>
      </div>
      <div className='w-12 h-6 bg-[#D9D9D9] border transform transition-transform active:scale-95 active:shadow-xl cursor-pointer'>
        {/* Boton Derecho */}
      </div>
    </section>
  )
}

export default Arrows
