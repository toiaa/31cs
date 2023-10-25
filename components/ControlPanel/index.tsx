import PlaceTile from '@/components/ControlPanel/PlaceTile'
import { useStoreSelectedTiles } from '@/store'
import { GridActionsInterface } from '@/ts/interfaces'
import { TILE_COLORS } from '@/utils/constants'
import React, { useState } from 'react'
import Amount from '../Amount'
import Button from '../Button'

const ControlPanel = ({ clearSelection }: GridActionsInterface) => {
  const [selectedColor, setSelectedColor] = useState('4')
  const handleColorSelection = (colorIndex: string) => {
    setSelectedColor(colorIndex)
    useStoreSelectedTiles.setState({ selectedColor: colorIndex })
  }
  return (
    <div className='grid-cards'>
      <div className='flex flex-col rounded w-full'>
        <div className='flex justify-between items-center gap-2'>
          <div className='border border-gray-borders rounded w-full h-10'></div>
          <p className='font-thin text-md'>OTOKEN</p>
        </div>
        <div className='flex items-center justify-between gap-2 p-1'>
          <div className='flex items-center gap-2'>
            ≈<Amount amount='0' type='price' />
          </div>
          <div className='flex gap-2'>
            <p className='font-thin text-sm text-gray-subtitle'>Balance:</p>
            <Amount amount='0' type='number' />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center gap-2 w-full p-1'>
        <div
          className={`bg-${TILE_COLORS[selectedColor]} h-10 w-10`}
          style={{
            backgroundColor: `${TILE_COLORS[selectedColor]}`,
          }}></div>

        <div className='flex flex-wrap py-1 justify-end w-32'>
          {Object.keys(TILE_COLORS).map((colorIndex) => {
            return (
              <div
                key={colorIndex}
                style={{
                  backgroundColor: `${TILE_COLORS[colorIndex]}`,
                }}
                className={'hover:border-2 hover:border-blue-400 h-8 w-8'}
                onClick={() => handleColorSelection(colorIndex)}></div>
            )
          })}
        </div>
      </div>
      <div className='flex gap-3'>
        <Button notMinW onClick={() => clearSelection && clearSelection()}>
          Clear
        </Button>
        <PlaceTile />
      </div>
    </div>
  )
}
export default ControlPanel
