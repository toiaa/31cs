import CheckBoxIcon from '@/assets/Icons/CheckBoxIcon'
import CheckIcon from '@/assets/Icons/CheckIcon'
import Button from '@/components/Button'
import { FilterFarmsInterface } from '@/ts/interfaces'
import { FILTER_FARMS } from '@/utils/constants'
import Image from 'next/image'
import { useCallback, useState } from 'react'
function FilterFarms({
  handleFilterSelect,
  filter,
  protocols,
  onSelectProtocols,
  checkedProtocols,
}: FilterFarmsInterface) {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false)

  const handleShowFilter = () => {
    setToggleFilter(!toggleFilter)
  }

  const onSelect = useCallback(
    (id: string) => {
      setToggleFilter(false)
      handleFilterSelect(id)
    },
    [handleFilterSelect],
  )

  return (
    <div className='relative w-36'>
      <div className='hidden lg:inline-flex justify-end w-full items-end'>
        <Button notMinW isFull onClick={() => handleShowFilter()}>
          Filter Farms
          <Image
            src='/images/dropdownArrow.svg'
            alt='dropdown'
            width={10}
            height={10}
            className={`object-contain transition-ease ${toggleFilter ? 'rotate-180' : 'rotate-0'}`}
          />
        </Button>
      </div>
      <div className='lg:hidden inline-flex justify-end'>
        <Button notMinW onClick={() => handleShowFilter()}>
          <CheckBoxIcon color='#fff' size={20} />
        </Button>
      </div>
      {toggleFilter && (
        <div className='z-10 absolute right-0 top-10 lg:top-10 bg-box-dark-neutral divide-y rounded-lg shadow w-32 lg:w-full'>
          <ul className='text-sm text-gray-700 dark:text-gray-200'>
            {Object.values(FILTER_FARMS).map(({ id, label }) => {
              return (
                <li
                  key={`${id}-farmlabel`}
                  onClick={() => onSelect(id)}
                  className='p-2 flex gap-2 hover:bg-box-pale-neutral items-center justify-between cursor-pointer transition-all'>
                  {filter === id && <CheckIcon />}
                  <p className='w-full flex justify-end text-end'>{label}</p>
                </li>
              )
            })}
            <div className='w-full border border-1 border-gray-borders' />
            {protocols.map((protocol, i) => {
              return (
                <li
                  key={`${protocol}-farmprotocol-${i}`}
                  className='pl-2 flex hover:bg-box-pale-neutral items-center justify-between cursor-pointer transition-all'>
                  <input
                    id={`${protocol}-farmprotocol-${i}`}
                    type='checkbox'
                    checked={checkedProtocols.includes(protocol)}
                    onChange={() => onSelectProtocols(protocol)}
                    className='cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor={`${protocol}-farmprotocol-${i}`}
                    className='w-full flex justify-end cursor-pointer p-2 text-end'>
                    {protocol}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterFarms
