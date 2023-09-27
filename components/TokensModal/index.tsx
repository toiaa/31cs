import { TokenModalI } from '@/ts/interfaces'
import { Token } from '@/ts/types'
import React from 'react'
import TokenInfo from '../TokenInfo'

const TokensModal = ({ onClose, items, onSelectItem, type }: TokenModalI) => {
  const onSelect = (item: Token) => {
    onSelectItem(item)
    onClose()
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-lg min-w-[400px]'>
          {/*content*/}
          <div className='border border-box-dark-neutral rounded-lg shadow-lg relative flex flex-col w-full bg-box outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-start p-3 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-lg font-semibold'>{`Select a ${type}`}</h3>
            </div>
            {/*body*/}
            <div className='relative p-2 flex flex-col gap-2'>
              {items.map((item) => (
                <div
                  key={`$-${item.symbol}`}
                  onClick={() => onSelect(item)}
                  className='p-1 w-full cursor-pointer hover:bg-box-pale-neutral rounded-md justify-between items-center flex border-b border-solid border-box-pale-neutral'>
                  <TokenInfo item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

export default TokensModal
