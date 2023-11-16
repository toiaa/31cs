import { PlaceButtonInterface } from '@/ts/interfaces'
import React from 'react'

const PlaceButton = ({ onClick, isDisabled = false, isLoading = false }: PlaceButtonInterface) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`place-joystick-btn ${isLoading || isDisabled ? 'opacity-75' : ''} `}
      type='button'
      onClick={onClick}>
      {isLoading || isDisabled ? <p>Loading</p> : <p>Place</p>}
    </button>
  )
}

export default PlaceButton
