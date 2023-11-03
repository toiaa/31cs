import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center'>
      <Link href='/' className='text-xl tracking-wider text-pink cursor-pointer'>
        31ST <span className='text-yellow'>CENTURY GAME</span>
      </Link>
    </div>
  )
}

export default Logo
