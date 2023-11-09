import usePixelGrid from '@/hooks/usePixelGrid'
import { useStorePixelGrid, useStorePointer, useStoreSelectedTiles } from '@/store'
import { clearPixelSelect } from '@/store/methods'
import { SingleGridInterface } from '@/ts/interfaces'
import { Tile } from '@/ts/types'
import { TILE_COLORS } from '@/utils/constants'
import { shortAddress } from '@/utils/methods'
import React, { useEffect, useState } from 'react'
import ControlPanel from '../ControlPanel'
import WrapperSelected from './WrapperSelected'
const SingleGridV2 = ({ nftId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid(nftId)
  const svgs = useStorePixelGrid()
  const { selectedTiles: selectedTilesStore } = useStoreSelectedTiles()
  const { pointer } = useStorePointer()
  const id = Number(nftId)

  const [tileOwner, setTileOwner] = useState<string | null>('')
  const [hoverCoorX, setHoverCoorX] = useState<number | null>(null)
  const [hoverCoorY, setHoverCoorY] = useState<number | null>(null)

  const hoverTile = (x: number | null, y: number | null, owner: string) => {
    setHoverCoorX(x)
    setHoverCoorY(y)
    setTileOwner(owner)
  }
  const addressShowed = shortAddress(tileOwner)

  const isSelected = ({ x, y }: Tile): boolean => {
    return selectedTilesStore.some((tile) => tile.x === x && tile.y === y)
  }

  const isPointer = ({ x, y }: Tile): boolean => {
    return pointer?.x === x && pointer.y === y
  }

  const handleSaveSelection = ({ x, y }: Tile) => {
    if (isSelected({ x, y })) {
      const updatedTiles = selectedTilesStore.filter((tile) => !(tile.x === x && tile.y === y))
      useStoreSelectedTiles.setState({
        selectedTiles: updatedTiles,
        nftId: nftId,
      })
    } else {
      useStoreSelectedTiles.setState({ selectedTiles: [...selectedTilesStore, { x, y }], nftId: nftId })
    }
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
    <section className='bg-[#D9D9D9] p-4 rounded-[25px] w-full h-full flex gap-1'>
      <div className='flex gap-2 flex-col w-full min-w-[400px]'>
        <div className='bg-[#1D242F] w-full rounded-[100px] p-4 text-lg tracking-wider flex justify-between'>
          <p>TOKEN ID: {id}</p>
          <p>
            X:{hoverCoorX !== null ? hoverCoorX : '...'} Y:
            {hoverCoorY !== null ? hoverCoorY : '...'}
          </p>
          <p>OWNER: {addressShowed}</p>
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-2'>
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
        </div>
      </div>
      <div className='lg:flex hidden gap-2 flex-col w-full max-w-[250px]'>
        <div className='flex items-start bg-[#1D242F] w-full rounded-[25px] h-fit p-3'>
          <ControlPanel />
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-3'>INFORMATION SECTION</div>
      </div>
    </section>
  )
}

export default SingleGridV2
