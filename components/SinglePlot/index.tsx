import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ControlPanel } from '../ControlPanel'
import TilesStats from '../TilesStats'

const SinglePlot = ({ svgId }: { svgId: string | string[] | undefined }) => {
  return (
    <div className='flex w-full gap-5 flex-col lg:flex-row'>
      <div className='side-card-custom flex flex-col items-center gap-5'>
        <ControlPanel />
        <TilesStats />
      </div>
      <div className='side-card-custom flex flex-col items-center gap-2 '>
        <div className='flex w-full gap-1'>
          <div className='h-16 w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2'>
            <Link href='/'>
              <ArrowLeftIcon />
            </Link>
            Token {svgId}
          </div>
          <div className='h-16 w-2/3 flex flex-col items-center bg-box border border-button-main-light rounded p-2'>
            <p>X:1 Y:2</p>
            <p>Owner:0x.....2323fe</p>
          </div>
        </div>
        <div className='flex'>
          <Image
            className='border border-button-main-light rounded'
            src={`/images/board/board${svgId}.svg`}
            alt='nft'
            width={475}
            height={10}
          />
        </div>
      </div>
    </div>
  )
}
export default SinglePlot
