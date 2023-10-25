import usePixelGrid from '@/hooks/usePixelGrid'
import { useStoreSelectedTiles } from '@/store'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import React, { useState } from 'react'
import GridActions from '../GridActions'
import SquareLoader from '../Loader/SquareLoader'
import PixelGrid from './PixelGrid'
const SingleGrid = ({ svgId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(svgId)
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])
  const { selectedTiles: storeSelectedTiles } = useStoreSelectedTiles()

  const handleSaveSelection = (x: number, y: number) => {
    const isTileSelected = selectedTiles.some((tile) => tile.x === x && tile.y === y)
    if (isTileSelected) {
      const updatedTiles = selectedTiles.filter((tile) => !(tile.x === x && tile.y === y))
      useStoreSelectedTiles.setState({ selectedTiles: updatedTiles, tokenId: svgId })
    } else {
      setSelectedTiles([...selectedTiles, { x, y }])
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTiles, { x, y }], tokenId: svgId })
    }
  }
  const clearSelection = () => {
    if (selectedTiles) {
      setSelectedTiles([])
      useStoreSelectedTiles.setState({ selectedTiles: [], tokenId: svgId })
    }
    return null
  }
  return (
    <div className='flex flex-col md:flex-col lg:flex-row gap-2 rounded bg-box p-2 h-full'>
      <div className='card-custom flex flex-col gap-2'>
        {isLoading ? (
          <div className='flex flex-col w-[540px] items-center justify-center h-full'>
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
