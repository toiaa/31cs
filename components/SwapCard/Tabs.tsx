import { SwapTabsInterface } from '@/ts/interfaces'
import { TOOLTIPS_SWAP_TABS } from '@/utils/constants'
import React from 'react'
import TooltipQuestion from '../TooltipQuestion'

const Tabs = ({ activeTab, list, onUpdate }: SwapTabsInterface) => {
  return (
    <ul className={'grid grid-flow-col max-w-full border border-input text-center rounded'}>
      {list.map((option, i) => (
        <li onClick={() => onUpdate(i)} key={`${option}-${i}`}>
          <div
            className={`flex-center cursor-pointer transition-ease py-4 gap-2 ${
              activeTab === i ? 'bg-button-secondary-color  text-button-text rounded bg-opacity-6' : ''
            }`}>
            {option}
            <TooltipQuestion
              color={activeTab === i ? 'white' : 'gray'}
              maxWidth='150'
              text={TOOLTIPS_SWAP_TABS[option.toLowerCase()]}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Tabs
