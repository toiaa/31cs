import usePixelGrid from '@/hooks/usePixelGrid'
import { useStoreSelectedTiles } from '@/store'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import React, { useState } from 'react'
import GridActions from '../GridActions'
import SquareLoader from '../Loader/SquareLoader'
import PixelGrid from './PixelGrid'
const SingleGrid = ({ nftId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(nftId)
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])

  const handleSaveSelection = (x: number, y: number) => {
    const isTileSelected = selectedTiles.some((tile) => tile.x === x && tile.y === y)
    if (isTileSelected) {
      const updatedTiles = selectedTiles.filter((tile) => !(tile.x === x && tile.y === y))
      setSelectedTiles(updatedTiles)
      useStoreSelectedTiles.setState({ selectedTiles: updatedTiles, nftId: nftId })
    } else {
      setSelectedTiles([...selectedTiles, { x, y }])
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTiles, { x, y }], nftId: nftId })
    }
  }
  const clearSelection = () => {
    if (selectedTiles) {
      setSelectedTiles([])
      useStoreSelectedTiles.setState({ selectedTiles: [], nftId: nftId })
    }
    return null
  }
  return (
    <div className='flex flex-col md:flex-col lg:flex-row items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2 '>
        {isLoading ? (
          <div className='flex flex-col w-[540px] items-center justify-center'>
            <SquareLoader />
          </div>
        ) : (
          <PixelGrid
            nftId={nftId}
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
