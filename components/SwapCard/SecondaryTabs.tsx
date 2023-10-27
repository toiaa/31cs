import { SwapTabsInterface } from '@/ts/interfaces'
import { TOOLTIPS_SECONDARY_SWAP_TABS } from '@/utils/constants'
import dynamic from 'next/dynamic'
import React from 'react'

const TooltipQuestion = dynamic(() => import('../TooltipQuestion'), { ssr: false })

const SecondaryTabs = ({ activeTab, list, onUpdate }: SwapTabsInterface) => {
  return (
    <ul className='flex-center text-sm bg-button-darkest rounded p-1 border border-input cursor-pointer'>
      {list.map((option, i) => (
        <li
          key={`${option}-${i}`}
          className={`${
            activeTab === i ? ' bg-button-secondary-color bg-opacity-80 text-button-text' : ''
          }  rounded p-1 w-full`}>
          <div className='w-full' onClick={() => onUpdate(i)}>
            <div className='flex justify-center gap-2'>
              {option}
              <TooltipQuestion
                color={activeTab === i ? 'white' : 'gray'}
                maxWidth='150'
                text={TOOLTIPS_SECONDARY_SWAP_TABS[option.toLowerCase()]}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SecondaryTabs
