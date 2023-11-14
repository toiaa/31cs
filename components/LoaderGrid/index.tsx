import Spinner from '@/components/Spinner'
import { TILE_COLORS } from '@/utils/constants'
import { generateRandomPixels } from '@/utils/methods'
import React, { useMemo } from 'react'

function LoaderGrid({ isGallery = false }: { isGallery?: boolean }) {
  const colorLength = Object.keys(TILE_COLORS).length - 1
  const loaderPixels = useMemo(() => generateRandomPixels(colorLength), [colorLength])
  return (
    <div className='w-full h-full flex items-center justify-center min-h-[350px] '>
      <div className='z-50 absolute'>
        <Spinner />
      </div>
      {isGallery && (
        <div className='blur-lg opacity-60 grid grid-cols-10 gap-0 h-full w-full mx-auto p-3'>
          {loaderPixels.map((tile, index) => (
            <div
              key={tile + index}
              style={{
                backgroundColor: TILE_COLORS[tile],
              }}></div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LoaderGrid
