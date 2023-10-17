import { useStoreGridGallery } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import svg from '/images/board/board1.svg'

function GalleryGrid() {
  const { gridGallery } = useStoreGridGallery()
  return (
    <div className='flex w-[540px] h-[540px] flex-wrap  justify-center '>
      {gridGallery.map((svg, id) => {
        return (
          <Link href={`/pixel/${id}`} key={id}>
            <div className='flex items-center justify-center group'>
              <p className='hidden group-hover:block z-100 absolute text-2xl text-bold text-[#A78BFA]'>{id}</p>
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
  )
}

export default GalleryGrid
