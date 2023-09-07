import React from 'react'

const HEADER_TITLES = ['Farms', 'Votes', 'Weekly Reward/Vote', 'Earned', 'Your Vote']
const ListHeader = () => {
  return (
    <div className='w-full flex py-4 px-2 md:p-4'>
      {HEADER_TITLES.map((title) => (
        <h4 key={`${title}-header`} className='w-full text-center font-semibold text-sm md:text-base'>
          {title}
        </h4>
      ))}
    </div>
  )
}

export default ListHeader
