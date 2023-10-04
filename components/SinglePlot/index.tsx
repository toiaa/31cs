import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ControlPanel } from '../ControlPanel'
import TilesStats from '../TilesStats'

const SinglePlot = ({ svgId }: { svgId: string | string[] | undefined }) => {
  return (
    <div className='card-custom flex flex-col items-center justify-between gap-5'>
      <div className='flex w-full items-center'>
        <div className='card-custom flex flex-col items-start justify-between gap-3'>
          <ControlPanel />
          <TilesStats />
        </div>
        <div className='card-custom flex flex-col  items-end justify-center gap-2'>
          <div className='flex w-[455px] gap-1'>
            <Link
              className='h-16 w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2'
              href='/'>
              <ArrowLeftIcon />
              Token {svgId}
            </Link>
            <div className='h-16 w-2/3 flex flex-col items-center bg-box border border-button-main-light rounded p-2'>
              <p>X:1 Y:2</p>
              <p>Owner:0x.....2323fe</p>
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-center'>
            <Image
              className='border border-box-dark-neutral '
              src={`/images/board/board${svgId}.svg`}
              alt='nft'
              width={455}
              height={10}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default SinglePlot
