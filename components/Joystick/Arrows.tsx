import React from 'react'

const Arrows = () => {
  return (
    <section className='flex items-center h-fit lg:pl-4 lg:pr-8 lg:py-14 py-4'>
      <div className='arrow-horizontal'>{/* Boton Izquierdo */}</div>
      <div className='flex flex-col'>
        <div className='arrow-vertical'>{/* Boton Arriba */}</div>
        <div className='p-3' />
        <div className='arrow-vertical'>{/* Boton Abajo */}</div>
      </div>
      <div className='arrow-horizontal'>{/* Boton Derecho */}</div>
    </section>
  )
}

export default Arrows
