import { IconButtonInterface } from '@/ts/interfaces'
import React from 'react'

const IconButton = ({ children, onClick }: IconButtonInterface) => {
  return (
    <button
      className='bg-transparent flex items-center justify-center hover:opacity-60 transition-all'
      type='button'
      onClick={onClick}>
      {children}
    </button>
  )
}

export default IconButton
