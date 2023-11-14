import useMulticall from '@/hooks/useMulticall'
import { useStoreSelectedTiles } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { TILE_COLORS } from '@/utils/constants'
import React, { useState } from 'react'
import Button from '../../Button'
import PlaceTile from './PlaceTile'

const ControlPanel = () => {
  const [selectedColor, setSelectedColor] = useState('4')
  const { isLoading } = useMulticall()

  const handleColorSelection = (colorIndex: string) => {
    setSelectedColor(colorIndex)
    useStoreSelectedTiles.setState({ selectedColor: colorIndex })
  }
  return (
    <div className='flex flex-row-reverse items-center justify-center gap-2'>
      <div className='flex flex-col justify-center items-center gap-1 w-full'>
        <div
          className={`bg-${TILE_COLORS[selectedColor]} hidden h-12 w-12  border border-gray-borders`}
          style={{
            backgroundColor: `${TILE_COLORS[selectedColor]}`,
          }}></div>
        <div className='flex flex-wrap p-2 gap-2 justify-center items-center'>
          {Object.keys(TILE_COLORS).map((colorIndex) => {
            return (
              <div
                key={colorIndex}
                style={{
                  backgroundColor: `${TILE_COLORS[colorIndex]}`,
                }}
                className={`cursor-pointer h-6 w-6 lg:h-8 lg:w-8 ${
                  TILE_COLORS[selectedColor] === TILE_COLORS[colorIndex]
                    ? 'border-4 border-color-selected'
                    : 'hover:border-4 hover:border-color-selected'
                }`}
                onClick={() => handleColorSelection(colorIndex)}></div>
            )
          })}
        </div>
      </div>
      <div className='hidden gap-3'>
        <Button notMinW onClick={() => clearPixelSelect()}>
          Clear
        </Button>
        <PlaceTile isLoading={isLoading} />
      </div>
    </div>
  )
}
export default ControlPanel
