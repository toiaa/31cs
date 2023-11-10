/* eslint-disable @next/next/no-img-element */
import useMulticall from '@/hooks/useMulticall'
import { useStoreGridGallery } from '@/store'
import Link from 'next/link'
import React, { useState } from 'react'
import LoaderGrid from '../LoaderGrid'

const GeneralGrid = () => {
  const { isLoadingGridGallery } = useMulticall()
  const { gridGallery } = useStoreGridGallery()
  const [tokenId, setTokenId] = useState<string | null>(null)
  const handlehover = (id: string) => {
    setTokenId(id)
  }

  if (!gridGallery) return null

  return (
    <section className='bg-[#1D242F] rounded-t-[25px] w-full h-full flex gap-2 flex-col'>
      <div className='w-full text-lg p-4 tracking-wider flex justify-between'>
        <p>TOKEN ID: {tokenId}</p>
        <p>OWNER: 0x0...0000</p>
      </div>
      <div className='w-full h-full'>
        {isLoadingGridGallery && <LoaderGrid isGallery />}
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
