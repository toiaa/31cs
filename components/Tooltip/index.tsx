import { DirectionsType } from '@/ts/types'
import React, { useState } from 'react'

const Tooltip = ({
  position,
  text,
  children,
}: {
  position: DirectionsType
  text: string
  children: React.ReactNode
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)
  const handleHover = () => {
    setTooltipVisible(true)
  }

  const handleLeave = () => {
    setTooltipVisible(false)
  }
  return (
    <div className='relative inline-block' onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      {children}
      {isTooltipVisible && (
        <div
          className={`${
            position === 'left' ? 'right-3 bottom-10' : position === 'up' ? 'bottom-10' : ''
          } absolute bg-slate-800 p-2 text-sm rounded-md z-10 hidden lg:flex`}>
          {text}
        </div>
      )}
      <p
        className={`flex lg:hidden absolute text-xs ${
          position === 'left'
            ? 'right-3'
            : position === 'up'
            ? 'bottom-7 -left-4 whitespace-nowrap'
            : position === 'right'
            ? '-right-2'
            : 'left-1'
        }`}>
        {text}
      </p>
    </div>
  )
}

export default Tooltip
