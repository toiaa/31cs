import { PlaceButtonInterface } from '@/ts/interfaces'
import React from 'react'

const PlaceButton = ({ onClick, isDisabled = false, isLoading = false }: PlaceButtonInterface) => {
  return (
    <button disabled={isDisabled || isLoading} className='place-joystick-btn' type='button' onClick={onClick}>
      {isLoading || isDisabled ? <p>...</p> : <p>Place</p>}
    </button>
  )
}

export default PlaceButton
