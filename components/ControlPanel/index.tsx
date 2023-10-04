import React, { useState } from 'react'
import Amount from '../Amount'
import Button from '../Button'
import SwapInput from '../SwapCard/SwapInput'

export const ControlPanel = () => {
  const COLORS = [
    '#EA00EF',
    '#4CFF45',
    '#EFCA02',
    '#FF3130',
    '#33BDFF',
    '#02FBCF',
    '#FD6665',
    '#FF9700',
    '#FFFFFF',
    '#000000',
  ]
  const [selectedColor, setSelectedColor] = useState('#EA00EF')
  const handleColorSelection = (color: string) => {
    setSelectedColor(color)
  }
  return (
    <div className='flex flex-col p-3 w-[350px] h-64 bg-box items-center border border-button-main-light rounded '>
      <div className='flex flex-col rounded w-full'>
        <div className='flex justify-between items-center gap-2'>
          <SwapInput
            value={''}
            onInput={() => {
              console.log('hi')
            }}
            isDisabled={false}
            type='number'
            textCenter={true}
          />
          <p className='font-thin text-md '>TILES</p>
        </div>
        <div className='flex items-center justify-between gap-2 p-2'>
          <div className='flex items-center gap-2'>
            ≈<Amount amount='0' type='price' />
          </div>
          <div className='flex gap-2'>
            <p className='font-thin text-sm text-gray-subtitle'>Balance:</p>
            <Amount amount='0' type='number' />
          </div>
        </div>
      </div>

      <div className='flex justify-between gap-3 w-full'>
        <div className='flex flex-col items-center gap-2 bg-box rounded p-2'>
          <p className='font-thin text-md text-gray-subtitle'>Selected color: </p>
          <div
            className={`bg-[${selectedColor}] h-10 w-10`}
            style={{
              backgroundColor: `${selectedColor}`,
            }}></div>
        </div>
        <div className='flex flex-col items-center gap-2  bg-box rounded p-2'>
          <p className='font-thin text-md text-gray-subtitle'>Choose a color: </p>
          <div className='flex flex-wrap items-center justify-center w-44 '>
            {COLORS.map((color) => {
              return (
                <div
                  key={color}
                  style={{
                    backgroundColor: `${color}`,
                  }}
                  className={`hover:border-2 hover:border-blue-400 bg-[${color}] h-8 w-8`}
                  onClick={() => handleColorSelection(color)}></div>
              )
            })}
          </div>
        </div>
      </div>
      <Button isFull>Place Tile</Button>
    </div>
  )
}
