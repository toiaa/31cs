import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import svg from '/images/board/board1.svg'

function NftGrid() {
  const svgIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className='flex flex-wrap items-center justify-center '>
      {svgIds.map((id) => {
        return (
          <Link href={`/plot/${id}`} key={id}>
            <div className='flex items-center justify-center group'>
              <p className='hidden group-hover:block z-100 absolute text-2xl text-bold text-[#A78BFA]'>{id}</p>
              <Image
                className='hover:border-2 hover:border-[#A78BFA] hover:opacity-30'
                src={`/images/board/board${id}.svg`}
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

export default NftGrid
