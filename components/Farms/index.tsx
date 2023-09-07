import SearchIcon from '@/assets/Icons/SearchIcon'
import useFarms from '@/hooks/useFarms'
import { useStoreGaugeCards } from '@/store'
import { FILTER_FARMS } from '@/utils/constants'
import debounce from 'lodash/debounce'
import { useCallback, useMemo, useState } from 'react'
import FarmList from './FarmsList'
import FilterFarms from './FilterFarms'

function FarmsSection() {
  const [filterSelected, setFilterSelected] = useState('active')
  const [checkedProtocols, setCheckedProtocols] = useState<string[]>([])

  const { isLoading } = useFarms()
  const { gauges } = useStoreGaugeCards()
  const [inputValue, setInputValue] = useState<string>('')

  const handleFilterSelect = (filter: string) => {
    handleFilter(filter)
  }

  const onSelectProtocols = useCallback(
    (protocol: string) => {
      if (checkedProtocols.includes(protocol)) {
        const updatedProtocols = checkedProtocols.filter((p) => p !== protocol)
        setCheckedProtocols(updatedProtocols)
      } else {
        const updatedProtocols = [...checkedProtocols, protocol]
        setCheckedProtocols(updatedProtocols)
      }
    },
    [checkedProtocols],
  )

  const isValueIncluded = (value: string, symbol: string) => {
    if (value === '') return true
    return symbol.toLowerCase().includes(value.toLowerCase())
  }

  const handleFilter = (filter: string) => {
    setFilterSelected(filter)
  }

  const handleInput = (typeValue: string) => {
    setInputValue(typeValue)
  }
  const debounceHandleInput = debounce(handleInput, 500)
  const protocols: string[] = useMemo(() => {
    if (gauges)
      return gauges.reduce((unique: string[], gauge) => {
        if (!unique.includes(gauge.protocol) && gauge.isAlive) {
          unique.push(gauge.protocol)
        }
        return unique
      }, [])

    return []
  }, [gauges])

  const checkProtocols = useCallback(
    (protocol: string) => {
      if (checkedProtocols.length <= 0) return true
      return checkedProtocols.includes(protocol)
    },
    [checkedProtocols],
  )
  const isFilterSelected = useCallback((status: string) => filterSelected === status, [filterSelected])

  const filteredGauges = useMemo(
    () =>
      gauges?.filter((gauge) => {
        if (checkProtocols(gauge.protocol) && isValueIncluded(inputValue, gauge.symbol)) {
          if (isFilterSelected('all')) return true
          if (isFilterSelected('active')) return gauge.isAlive
          if (isFilterSelected('inactive')) return !gauge.isAlive
        }
        return false
      }) ?? [],
    [gauges, inputValue, checkProtocols, isFilterSelected],
  )

  return (
    <section className='flex flex-col gap-5'>
      <div className='w-full flex justify-between items-center '>
        <h2 className='flex gap-1 text-md font-bold'>
          {FILTER_FARMS[filterSelected].label} <p>({filteredGauges.length})</p>
        </h2>
        <div className='flex items-center gap-2'>
          <div className='flex items-center bg-transparent h-[38px] w-[150px] text-[18px] flex-1 rounded-lg p-2 outline-none border-2 border-gray-borders transition-all ease-in-out delay-150 gap-1 focus-within:border-button-main-darkest lg:focus-within:w-[200px]'>
            <span>
              <SearchIcon color='gray-borders' />
            </span>
            <input
              className='flex bg-transparent w-full h-full outline-none text-white'
              placeholder='Search...'
              onChange={(e) => debounceHandleInput(e.target.value)}
            />
          </div>
          <FilterFarms
            handleFilterSelect={handleFilterSelect}
            filter={filterSelected}
            protocols={protocols}
            onSelectProtocols={onSelectProtocols}
            checkedProtocols={checkedProtocols}
          />
        </div>
      </div>
      <FarmList filteredGauges={filteredGauges} isLoading={isLoading} />
    </section>
  )
}

export default FarmsSection
