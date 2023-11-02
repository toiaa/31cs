/* eslint-disable @next/next/no-img-element */
import useMulticall from '@/hooks/useMulticall'
import { useStoreGridGallery } from '@/store'
import Link from 'next/link'
import React, { useState } from 'react'

const GeneralGrid = () => {
  const { isLoadingGridGallery } = useMulticall()
  const { gridGallery } = useStoreGridGallery()
  const [tokenId, setTokenId] = useState<string | null>(null)
  const handlehover = (id: string) => {
    setTokenId(id)
  }

  if (!gridGallery) return null

  return (
    <section className='bg-[#D9D9D9] p-4 rounded-[25px] w-full h-full flex gap-2 flex-col'>
      <div className='bg-[#1D242F] w-full rounded-[100px] p-4 text-lg tracking-wider flex justify-between'>
        <p>TOKEN ID: {tokenId}</p>
        <p>OWNER: 0x....00000</p>
      </div>
      <div className='bg-[#1D242F] w-full h-full rounded-[25px] p-6 max-h-[550px] overflow-y-scroll overscroll-none'>
        <div className='grid grid-cols-4'>
          {Object.keys(gridGallery).map((id: string) => {
            const svg = gridGallery[id]
            return (
              <div key={id}>
                <Link href={`/nft/${id}`} onMouseOver={() => handlehover(id)}>
                  <img
                    className='hover:opacity-30 w-full h-auto transition-opacity'
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                    alt='nft'
                  />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GeneralGrid
