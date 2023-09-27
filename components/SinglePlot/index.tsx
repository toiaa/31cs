import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../Button'

const SinglePlot = ({ svgId }: { svgId: string | string[] | undefined }) => {
  return (
    <>
      <div className='flex w-full gap-3'>
        <div className='w-full'>
          <div className='flex w-full gap-3'>
            <div className='w-1/3 flex gap-3 items-center bg-box border border-button-main-light rounded p-2'>
              <Link href='/'>
                <ArrowLeftIcon />
              </Link>
              Token {svgId}
            </div>
            <div className='w-2/3 h-24 flex items-center bg-box  border border-button-main-light rounded p-2'>
              Tiles earnings per week
            </div>
          </div>
          <div className='flex flex-col p-2 gap-3'>
            <div className='w-full flex items-center gap-3 bg-box  border border-button-main-light rounded p-2'>
              <p className='font-thin text-md text-gray-subtitle'>You own:</p>4 tiles
            </div>
            <div className='w-full flex items-center gap-3 bg-box  border border-button-main-light rounded p-2'>
              <p className='font-thin text-md text-gray-subtitle'>oTOKEN balance:</p>
              30.000
            </div>
            <div className='w-full flex items-center gap-3 flex-col  bg-box  border border-button-main-light rounded p-2'>
              <p className='font-thin text-md text-gray-subtitle'>Selected tile: </p>
              <div className='flex justify-around gap-10'>
                <div className='bg-[#EA00EF] h-10 w-10'></div>
                <p className='font-thin text-md '>X: 0, Y: 0</p>
              </div>
            </div>
            <div className='w-full flex flex-col items-center gap-3  bg-box  border border-button-main-light rounded p-2'>
              <p className='font-thin text-md text-gray-subtitle'>Select a new color: </p>
              <div className='flex gap-3'>
                <div className='hover:border-2 hover:border-blue-400 bg-[#EA00EF] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400  bg-[#4CFF45] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#EFCA02] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#FF3130] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#33BDFF] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#02FBCF] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400  bg-[#FD6665] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#FF9700] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#FFFFFF] h-10 w-10'></div>
                <div className='hover:border-2 hover:border-blue-400 bg-[#000000] h-10 w-10'></div>
              </div>
            </div>
            <Button isFull>Place Tile</Button>
          </div>
        </div>
        <div className='w-full'>
          <div className='h-24 flex flex-col items-center bg-box border border-button-main-light rounded p-2'>
            <p>X:1 Y:2</p>
            <p>Owner:0x.....2323fe</p>
            <p>Color: #fffff</p>
          </div>
          <div className='w-full flex items-center justify-center p-2 '>
            <Image
              className='border border-button-main-light rounded'
              src={`/images/board/board${svgId}.svg`}
              alt='nft'
              width={400}
              height={15}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default SinglePlot
