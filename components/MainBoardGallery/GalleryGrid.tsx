import { useStoreGridGallery } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
// import svg from '/images/board/board1.svg'

function GalleryGrid() {
  const { gridGallery } = useStoreGridGallery()
  const [tokenId, setTokenId] = useState<number | null>(null)
  const handlehover = (id: number) => {
    setTokenId(id)
  }
  return (
    <div className='flex flex-col justify-center items-center gap-3'>
      <div className='flex items-center justify-around border border-button-main-light rounded p-2 w-full'>
        <p className='text-bold text-md'>
          Token id:&nbsp;<span>{tokenId}</span>
        </p>
        <p>Owner:0x.....2323fe</p>
      </div>

      <div className='flex w-[540px] h-[540px] flex-wrap justify-center '>
        {gridGallery.map((svg, id) => {
          return (
            <Link href={`/pixel/${id}`} key={id} onMouseOver={() => handlehover(id)}>
              <div className='flex items-center justify-center group'>
                <Image
                  className='hover:border-2 hover:border-[#A78BFA] hover:opacity-30'
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                  width={180}
                  height={175}
                  alt='nft'
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryGrid
