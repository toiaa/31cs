import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Link href='/' className='font-bold text-md lg:text-lg text-pink cursor-pointer'>
        31CS<span className='text-yellow'>GAME</span>
      </Link>
    </div>
  )
}

export default Logo
