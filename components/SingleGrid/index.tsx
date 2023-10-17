import usePixelGrid from '@/hooks/usePixelGrid'
import { SingleGridInterface } from '@/ts/interfaces'
import React from 'react'
import GridActions from '../GridActions'
import PixelGrid from './PixelGrid'

const SingleGrid = ({ svgId }: SingleGridInterface) => {
  const { isLoading } = usePixelGrid()
  return (
    <div className='flex flex-col md:flex-col lg:flex-row items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2 '>
        <PixelGrid svgId={svgId} />
      </div>
      <GridActions />
    </div>
  )
}
export default SingleGrid
