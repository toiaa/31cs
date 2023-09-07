import React from 'react'

const Skeleton = () => {
  return (
    <div role='status' className='max-w-sm animate-pulse'>
      <div className='h-5 bg-gray-200 rounded-full bg-gray-borders w-[90px] '></div>
    </div>
  )
}

export default Skeleton
