import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import { useStorePixelGrid } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { PixelGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import { TILE_COLORS } from '@/utils/constants'
import Link from 'next/link'
import React, { useState } from 'react'

const PixelGrid = ({ nftId, handleSaveSelection, selectedTiles }: PixelGridInterface) => {
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
  const isSelected = (x: number, y: number, selectedTiles: Tile[]): boolean => {
    return selectedTiles.some((tile) => tile.x === x && tile.y === y)
  }
  return (
    <>
      <div className='flex w-full gap-2'>
        <Link
          onClick={() => clearPixelSelect()}
          href='/grid'
          className=' w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2'>
          <ArrowLeftIcon />
          Token {id}
        </Link>
        <div className='w-full flex items-center justify-around bg-box border border-button-main-light rounded p-2'>
          <p>
            X:{hoverCoorX != null && hoverCoorX >= 0 ? hoverCoorX : '...'} Y:
            {hoverCoorY != null && hoverCoorY >= 0 ? hoverCoorY : '...'}
          </p>
          <p>
            Owner:
            {addressShowed}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-10 gap-0 w-auto h-auto mx-auto' onMouseLeave={() => hoverTile(null, null, '')}>
        {svgs?.nftId.pixels &&
          svgs.nftId.pixels.map((row, rowIndex) => {
            return row.map((tile, colIndex) => {
              const tileColorIndex = Number(tile[0])
              const owner = tile[1] as string
              return (
                <div
                  key={colIndex + rowIndex}
                  onClick={() => {
                    handleSaveSelection(colIndex, rowIndex, owner)
                  }}
                  onMouseOver={() => {
                    hoverTile(colIndex, rowIndex, owner)
                  }}
                  className={`flex w-[50px] h-[50px] items-center justify-center 
                   ${
                     isSelected(colIndex, rowIndex, selectedTiles)
                       ? 'selectedTile hover:border-2 hover:border-tile-hover-border'
                       : 'hover:border-2 hover:border-tile-hover-border'
                   }
                   cursor-pointer `}
                  style={{
                    backgroundColor: TILE_COLORS[tileColorIndex],
                  }}></div>
              )
            })
          })}
      </div>
    </>
  )
}
export default PixelGrid
