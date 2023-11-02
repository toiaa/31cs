import { useStorePixelGrid } from '@/store'
import { TILE_COLORS } from '@/utils/constants'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SingleGridV2 = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const svgs = useStorePixelGrid()

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

  console.log('svgs ', svgs)
  if (!svgs) return null
  return (
    <section className='bg-[#D9D9D9] p-4 rounded-[25px] w-full h-full flex gap-1'>
      <div className='flex gap-2 flex-col w-full min-w-[400px]'>
        <div className='bg-[#1D242F] w-full rounded-[100px] p-4 text-lg tracking-wider flex justify-between'>
          <p>TOKEN ID: {id}</p>
          <p>OWNER: {addressShowed}</p>
        </div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-6'>PIXELS SECTION</div>
        <div
          className='grid grid-cols-10 gap-0 w-auto h-auto mx-auto min-w-[450px]'
          onMouseLeave={() => hoverTile(null, null, '')}>
          {svgs?.id.pixels &&
            svgs.id.pixels.map((row, rowIndex) => {
              return row.map((tile, colIndex) => {
                const tileColorIndex = Number(tile[0])
                const owner = tile[1] as string
                return (
                  <div
                    key={colIndex + rowIndex + id}
                    onMouseOver={() => {
                      hoverTile(colIndex, rowIndex, owner)
                    }}
                    className={`flex w-[50px] h-[50px] items-center justify-center 
           
                   cursor-pointer `}
                    style={{
                      backgroundColor: TILE_COLORS[tileColorIndex],
                    }}></div>
                )
              })
            })}
        </div>
      </div>
      <div className='lg:flex hidden gap-2 flex-col w-full max-w-[250px]'>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-6'>PLACE TILE SECTION</div>
        <div className='bg-[#1D242F] w-full rounded-[25px] h-full p-6'>INFORMATION SECTION</div>
      </div>
    </section>
  )
}

export default SingleGridV2
