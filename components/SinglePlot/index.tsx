import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GridActions from '../GridActions'

const SinglePlot = ({ svgId }: { svgId: string | string[] | undefined }) => {
  return (
    <div className='flex items-center justify-between gap-2 rounded bg-box p-2'>
      <div className='card-custom flex flex-col gap-2 '>
        <div className='flex w-full gap-2'>
          <Link className=' w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2' href='/'>
            <ArrowLeftIcon />
            Token {svgId}
          </Link>
          <div className='w-full flex items-center justify-around bg-box border border-button-main-light rounded p-2'>
            <p>X:1 Y:2</p>
            <p>Owner:0x.....2323fe</p>
          </div>
        </div>

        <Image
          className='border border-box-dark-neutral '
          src={`/images/board/board${svgId}.svg`}
          alt='nft'
          width={540}
          height={580}
        />
      </div>
      <GridActions />
    </div>
  )
}
export default SinglePlot
