import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Link href='/' className='font-bold text-md lg:text-lg text-pink cursor-pointer'>
        TOKEN<span className='text-yellow'>PROJECT</span>
      </Link>
    </div>
  )
}

export default Logo
