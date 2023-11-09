import { TILE_COLORS } from '@/utils/constants'
import React from 'react'

const WrapperSelected = ({
  children,
  tileColorIndex,
  isSelected,
  isPointer,
}: {
  children: React.ReactNode
  tileColorIndex: number
  isSelected: boolean
  isPointer: boolean
}) => {
  return (
    <div
      className={`p-[2px] ${isPointer ? 'rainbow-bg' : ''}`}
      style={{
        backgroundColor: `${isSelected ? '#d8b4fe' : TILE_COLORS[tileColorIndex]}`,
      }}>
      {children}
    </div>
  )
}

export default WrapperSelected
