import { SettingsTabsInterface } from '@/ts/interfaces'
import React from 'react'

const SettingsTabs = ({ activeTabId, list, onSelect }: SettingsTabsInterface) => {
  return (
    <>
      <ul className='flex-center text-sm bg-button-darkest border border-gray-borders rounded w-full text-button-text'>
        {list.map((tab, index) => {
          return (
            <li
              key={`${tab.id}-${index}-tabs`}
              className={`${
                activeTabId === tab.id ? ' bg-button-secondary-color bg-opacity-6 ' : ''
              }  rounded p-2 w-full bg-opacity-75 transition-ease`}>
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

export default SettingsTabs
