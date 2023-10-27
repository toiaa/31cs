import PlaceTile from '@/components/GridCards/ControlPanel/PlaceTile'
import useBalance from '@/hooks/useBalance'
import useMulticall from '@/hooks/useMulticall'
import { useStoreSelectedTiles } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { GridActionsInterface } from '@/ts/interfaces'
import { TILE_COLORS } from '@/utils/constants'
import { formatEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import Amount from '../../Amount'
import Button from '../../Button'

const ControlPanel = ({ isPixel }: GridActionsInterface) => {
  const [selectedColor, setSelectedColor] = useState('4')
  const { isLoading } = useMulticall()
  const { getBalance, getPrice } = useBalance()
  const balanceOTOKEN = getBalance('otoken')
  const priceOTOKEN = getPrice('otoken')
  const { selectedTiles } = useStoreSelectedTiles()
  const formatBalanceOTOKEN = formatEther(balanceOTOKEN)
  const OTOKENAmount = selectedTiles.length.toString()
  const priceAmount = Number(OTOKENAmount) * Number(formatEther(priceOTOKEN))
  const handleColorSelection = (colorIndex: string) => {
    setSelectedColor(colorIndex)
    useStoreSelectedTiles.setState({ selectedColor: colorIndex })
  }
  return (
    <div className='grid-cards'>
      <div className='w-full flex flex-col rounded '>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex flex-center border border-gray-borders rounded w-full h-7'>
            <Amount amount={OTOKENAmount} type='number' />
          </div>
          <p className='font-thin text-md'>OTOKEN</p>
        </div>
        <div className='flex items-center justify-between gap-2 p-1'>
          <div className='flex items-center gap-2'>
            ≈<Amount amount={priceAmount.toString()} type='price' />
          </div>
          <div className='flex gap-2'>
            <p className='font-thin text-sm text-gray-subtitle'>Balance:</p>
            <Amount isLoading={isLoading} amount={formatBalanceOTOKEN} type='number' />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center gap-2 w-full p-1'>
        <div
          className={`bg-${TILE_COLORS[selectedColor]} h-14 w-14  border border-gray-borders`}
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
        <Button isDisabled={isPixel} notMinW onClick={() => clearPixelSelect()}>
          Clear
        </Button>
        <PlaceTile isPixel={isPixel && isPixel} />
      </div>
    </div>
  )
}
export default ControlPanel