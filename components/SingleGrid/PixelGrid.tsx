import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import { useStorePixelGrid } from '@/store'
import { SingleGridInterface } from '@/ts/interfaces'
import { tileColors } from '@/utils/constants'
import Link from 'next/link'
import React, { useState } from 'react'

const PixelGrid = ({ svgId }: SingleGridInterface) => {
  const { pixelGrids } = useStorePixelGrid()
  const id = Number(svgId)

  const [selectedX, setSelectedX] = useState<number | null>(null)
  const [selectedY, setSelectedY] = useState<number | null>(null)
  const [tilesOwner, setTilesOwner] = useState<string | null>('')
  const addressShowed = `${tilesOwner?.substring(0, 3)}...${tilesOwner?.substring(
    tilesOwner.length - 4,
    tilesOwner.length,
  )}`
  const handleSelectTile = (rowIndex: number, colIndex: number, owner: string) => {
    setSelectedX(colIndex)
    setSelectedY(rowIndex)
    setTilesOwner(owner)
  }
  return (
    <>
      <div className='flex w-full gap-2'>
        <Link className=' w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2' href='/'>
          <ArrowLeftIcon />
          Token {id}
        </Link>
        <div className='w-full flex items-center justify-around bg-box border border-button-main-light rounded p-2'>
          <p>
            X:{selectedX !== null ? selectedX : 'n/a'} Y:{selectedY !== null ? selectedY : 'n/a'}
          </p>
          <p>
            Owner:
            {addressShowed}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-10 gap-0 w-auto h-auto mx-auto'>
        {pixelGrids &&
          pixelGrids[id].map((row, rowIndex) => {
            return row.map((tile, colIndex) => {
              const tileColorIndex = Number(tile[0])
              const owner = tile[1] as string
              return (
                <div
                  key={colIndex}
                  onClick={() => {
                    handleSelectTile(rowIndex, colIndex, owner)
                  }}
                  className='flex items-center justify-center border-1 border-button-main-light '
                  style={{
                    width: '54px',
                    height: '54px',
                    backgroundColor: tileColors[tileColorIndex],
                  }}></div>
              )
            })
          })}
      </div>
    </>
  )
}
export default PixelGrid
