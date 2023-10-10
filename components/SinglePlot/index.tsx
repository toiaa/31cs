import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ControlPanel } from '../ControlPanel'
import TilesStats from '../TilesStats'

const SinglePlot = ({ svgId }: { svgId: string | string[] | undefined }) => {
  return (
    <div className='flex  bg-box items-center justify-between gap-5 rounded'>
      <div className='card-custom flex flex-col gap-2'>
        <div className='flex w-full gap-1'>
          <Link className=' w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2' href='/'>
            <ArrowLeftIcon />
            Token {svgId}
          </Link>
          <div className='w-full flex  items-center justify-around bg-box border border-button-main-light rounded p-2'>
            <p>X:1 Y:2</p>
            <p>Owner:0x.....2323fe</p>
          </div>
        </div>
        <div className='flex h-[530px] flex-wrap items-center justify-center'>
          <Image
            className='border border-box-dark-neutral '
            src={`/images/board/board${svgId}.svg`}
            alt='nft'
            width={700}
            height={500}
          />
        </div>
      </div>
      <div className='card-custom flex flex-col items-end justify-between gap-3'>
        <ControlPanel />
        <TilesStats />
      </div>
    </div>
  )
}
export default SinglePlot
