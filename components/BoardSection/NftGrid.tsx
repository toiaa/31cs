import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import svg from '/images/board/board1.svg'

function NftGrid() {
  const svgIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div className='flex flex-wrap items-center justify-center'>
      {svgIds.map((id) => {
        return (
          <Link href={`/plot/${id}`} key={id}>
            <Image
              className='hover:border hover:border-1 hover:border-pink'
              src={`/images/board/board${id}.svg`}
              width={250}
              height={15}
              alt='nft'
            />
          </Link>
        )
      })}
    </div>
  )
}

export default NftGrid
