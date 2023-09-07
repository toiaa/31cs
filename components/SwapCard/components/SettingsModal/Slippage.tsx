import useSetting from '@/hooks/useSetting'
import { SlippageSettingsTabsInterface } from '@/ts/interfaces'
import { formatInputValue } from '@/utils/methods'
import React from 'react'

const Slippage = ({ activeTabId, list, onSelect }: SlippageSettingsTabsInterface) => {
  const { customSlippage, updateCustomSlippage } = useSetting()

  const handleInput = (typeValue: string) => {
    const newValue = formatInputValue(typeValue, customSlippage)
    if (newValue !== customSlippage) {
      updateCustomSlippage(newValue)
    }
  }

  return (
    <>
      <ul className='flex bg-transparent items-center justify-around border border-gray-borders rounded w-full text-sm text-button-text'>
        {list.map((tab, index) => {
          if (tab.id === 3) {
            return (
              <input
                key={`${tab.id}-${index}-slippage`}
                onClick={() => onSelect(tab.id)}
                onChange={(e) => handleInput(e.target.value)}
                className={`rounded p-2 w-full  text-center placeholder:text-white transition-ease outline-none ${
                  activeTabId === tab.id ? 'bg-button-main-darkest bg-opacity-6' : 'bg-modal-neutral'
                }`}
                placeholder={tab.label}
                value={customSlippage}
              />
            )
          }
          return (
            <li
              key={`${tab.id}-${index}-slippage`}
              className={`${
                activeTabId === tab.id ? '  bg-button-main-darkest bg-opacity-6 ' : ''
              }  rounded p-2 w-full transition-ease`}>
              <button className='w-full' onClick={() => onSelect(tab.id)}>
                <p>{tab.label}</p>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Slippage
