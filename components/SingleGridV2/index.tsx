import usePixelGrid from '@/hooks/usePixelGrid'
import { useStorePixelGrid, useStoreSelectedTiles } from '@/store'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import { TILE_COLORS } from '@/utils/constants'
import React, { useState } from 'react'
import LoaderGrid from '../LoaderGrid'
import ControlPanel from '../SingleGrid/GridCards/ControlPanel'

const SingleGridV2 = ({ nftId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(nftId)
  const svgs = useStorePixelGrid()
  const id = Number(nftId)
  const [tileOwner, setTileOwner] = useState<string | null>('')
  const [hoverCoorX, setHoverCoorX] = useState<number | null>(null)
  const [hoverCoorY, setHoverCoorY] = useState<number | null>(null)
  const hoverTile = (x: number | null, y: number | null, owner: string) => {
    setHoverCoorX(x)
    setHoverCoorY(y)
    setTileOwner(owner)
  }
  const addressShowed = `${tileOwner?.substring(0, 3)}...${tileOwner?.substring(
    tileOwner.length - 4,
    tileOwner.length,
  )}`

  const { selectedTiles: selectedTilesStore } = useStoreSelectedTiles()
  const handleSaveSelection = (x: number, y: number) => {
    const isTileSelected = selectedTilesStore.some((tile) => tile.x === x && tile.y === y)
    if (isTileSelected) {
      const updatedTiles = selectedTilesStore.filter((tile) => !(tile.x === x && tile.y === y))
      useStoreSelectedTiles.setState({
        selectedTiles: updatedTiles,
        nftId: nftId,
      })
    } else {
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTilesStore, { x, y }], nftId: nftId })
    }
  }
  const isSelected = (x: number, y: number, selectedTiles: Tile[]): boolean => {
    return selectedTiles.some((tile) => tile.x === x && tile.y === y)
  }

  return (
    <section className='bg-[#D9D9D9] p-4 rounded-[25px] w-full h-full flex gap-1'>
      <div className='flex gap-2 flex-col w-full min-w-[400px]'>
        <div className='bg-[#1D242F] w-full rounded-[100px] p-4 text-lg tracking-wider flex justify-between'>
          <p>TOKEN ID: {id}</p>
          <p>
            X:{hoverCoorX != null && hoverCoorX >= 0 ? hoverCoorX : '...'} Y:
            {hoverCoorY != null && hoverCoorY >= 0 ? hoverCoorY : '...'}
          </p>
          <p>OWNER: {addressShowed}</p>
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-2 transition-ease'>
          {isLoading ? (
            <LoaderGrid isGallery={false} />
          ) : (
            <div
              className='grid grid-cols-10 gap-0 h-full min-h-[350px] w-full mx-auto p-3'
              onMouseLeave={() => hoverTile(null, null, '')}>
              {svgs?.nftId?.pixels &&
                !isLoading &&
                svgs.nftId.pixels.map((row, rowIndex) => {
                  return row.map((tile, colIndex) => {
                    const tileColorIndex = Number(tile[0])
                    const owner = tile[1] as string
                    return (
                      <div
                        key={colIndex + rowIndex + nftId}
                        className={`p-[2px] ${
                          isSelected(colIndex, rowIndex, selectedTilesStore)
                            ? 'selectedTile hover:bg-border-tile-hover-border'
                            : 'hover:bg-border-tile-hover-border'
                        }`}
                        style={{
                          backgroundColor: `${
                            isSelected(colIndex, rowIndex, selectedTilesStore) ? '' : TILE_COLORS[tileColorIndex]
                          }`,
                        }}>
                        <div
                          onClick={() => {
                            handleSaveSelection(colIndex, rowIndex)
                          }}
                          onMouseOver={() => {
                            hoverTile(colIndex, rowIndex, owner)
                          }}
                          className='w-full h-full
                  cursor-pointer'
                          style={{
                            backgroundColor: TILE_COLORS[tileColorIndex],
                          }}></div>
                      </div>
                    )
                  })
                })}
            </div>
          )}
        </div>
      </div>
      <div className='lg:flex hidden gap-2 flex-col w-full max-w-[250px]'>
        <div className='flex items-center bg-[#1D242F] w-full rounded-[25px] h-full p-3'>
          <ControlPanel />
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-3'>INFORMATION SECTION</div>
      </div>
    </section>
  )
}

export default SingleGridV2
