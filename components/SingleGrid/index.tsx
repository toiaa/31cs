import usePixelGrid from '@/hooks/usePixelGrid'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import React, { useState } from 'react'
import GridActions from '../GridActions'
import SquareLoader from '../Loader/SquareLoader'
import PixelGrid from './PixelGrid'

const SingleGrid = ({ svgId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(svgId)
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])
  const handleSaveSelection = (x: number, y: number) => {
    const isTileSelected = selectedTiles.some((tile) => tile.x === x && tile.y === y)
    if (isTileSelected) {
      const updatedTiles = selectedTiles.filter((tile) => !(tile.x === x && tile.y === y))
      setSelectedTiles(updatedTiles)
    } else {
      setSelectedTiles([...selectedTiles, { x, y }])
    }
  }
  const clearSelection = () => {
    if (selectedTiles) setSelectedTiles([])
    return null
  }
  return (
    <div className='flex flex-col md:flex-col lg:flex-row items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2 '>
        {isLoading ? (
          <div className='flex flex-col w-[540px] h-[540px] items-center justify-center'>
            <SquareLoader />
          </div>
        ) : (
          <PixelGrid
            svgId={svgId}
            handleSaveSelection={handleSaveSelection}
            selectedTiles={selectedTiles}
            clearSelection={clearSelection}
          />
        )}
      </div>
      <GridActions clearSelection={clearSelection} />
    </div>
  )
}
export default SingleGrid
