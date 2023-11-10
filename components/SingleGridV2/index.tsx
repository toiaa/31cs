import ArrowGameBoy from '@/assets/Icons/ArrowGameBoy'
import useControls from '@/hooks/useControls'
import usePixelGrid from '@/hooks/usePixelGrid'
import { useStorePixelGrid, useStorePointer } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import { CONTRACT_ZERO, TILE_COLORS } from '@/utils/constants'
import { shortAddress } from '@/utils/methods'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LoaderGrid from '../LoaderGrid'
import ControlPanel from './ControlPanel'
import WrapperSelected from './WrapperSelected'

const SingleGridV2 = ({ nftId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(nftId)
  const svgs = useStorePixelGrid()
  const { pointer } = useStorePointer()
  const { handleSaveSelection, isSelected } = useControls({ nftId })
  const id = Number(nftId)
  const [tileOwner, setTileOwner] = useState<string | null>(CONTRACT_ZERO)
  const [hoverCoorX, setHoverCoorX] = useState<number | null>(null)
  const [hoverCoorY, setHoverCoorY] = useState<number | null>(null)

  const hoverTile = (x: number | null, y: number | null, owner: string) => {
    setHoverCoorX(x)
    setHoverCoorY(y)
    setTileOwner(owner)
  }
  const addressShowed = shortAddress(tileOwner)

  const isPointer = ({ x, y }: Tile): boolean => {
    return pointer?.x === x && pointer.y === y
  }

  useEffect(() => {
    return () => {
      clearPixelSelect()
    }
  }, [nftId])

  const updatePointer = (tile: Tile) => {
    useStorePointer.setState({ pointer: tile })
  }

  return (
    <section className='bg-[#334155] p-4 max-md:p-2 rounded-[25px] w-full h-full flex max-md:flex-col flex-row max-md:gap-1 gap-2'>
      <div className='flex gap-2 flex-col w-full max-md:h-full  md:min-w-[400px]'>
        <div className='bg-[#1D242F] w-full rounded-[100px] p-4 text-lg tracking-wider flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <Link href='/game'>
              <ArrowGameBoy onClick={clearPixelSelect} />
            </Link>
            <p>TOKEN ID: {id}</p>
          </div>
          <p>
            X:{hoverCoorX !== null ? hoverCoorX : '...'} Y:
            {hoverCoorY !== null ? hoverCoorY : '...'}
          </p>
          <p className='min-w-[135px]'>OWNER: {addressShowed}</p>
        </div>
        <div className='bg-[#131820] w-full rounded-[25px] h-full p-2'>
          {isLoading ? (
            <LoaderGrid isGallery={false} />
          ) : (
            <div
              className='grid grid-cols-10 gap-0 h-full min-h-[350px] w-full mx-auto p-3'
              onMouseLeave={() => hoverTile(null, null, '')}>
              {svgs?.nftId?.pixels &&
                !isLoading &&
                svgs.nftId.pixels.map((row, y) => {
                  return row.map((tile, x) => {
                    const tileColorIndex = Number(tile[0])
                    const owner = tile[1] as string
                    return (
                      <WrapperSelected
                        key={x + y + nftId}
                        isSelected={isSelected({ x, y })}
                        isPointer={isPointer({ x, y })}
                        tileColorIndex={tileColorIndex}>
                        <div
                          onClick={() => {
                            handleSaveSelection({ x, y })
                            updatePointer({ x, y })
                          }}
                          onMouseOver={() => {
                            hoverTile(x, y, owner)
                          }}
                          className='w-full h-full
                  cursor-pointer'
                          style={{
                            backgroundColor: TILE_COLORS[tileColorIndex],
                          }}
                        />
                      </WrapperSelected>
                    )
                  })
                })}
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-2 max-md:min-w-full max-w-[250px] max-md:flex-row flex-col '>
        <div className=' items-start bg-[#1D242F] w-full  max-md:rounded-b-[25px] md:rounded-[25px] h-fit p-3'>
          <ControlPanel />
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-3 hidden md:flex'>INFORMATION SECTION</div>
      </div>
    </section>
  )
}

export default SingleGridV2
