import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import React from 'react'
import Logo from './Logo'
import MobileNav from './MobileNav'
import Navigation from './Navigation'

const Navbar = () => {
  return (
    <nav className={'container-custom '}>
      <div className='flex items-center justify-between w-full h-16 from-button-main-trans from-10% rounded-lg '>
        {/* Left Side Logo and navLinks */}
        <div className='flex items-center w-1/2 justify-start gap-[80px] h-16'>
          <Logo />
          <div className='lg:flex hidden'>
            <Navigation />
          </div>
        </div>

        {/* Right Side */}
        <div className='flex items-center w-1/2 justify-end h-16'>
          <DynamicWidget />
        </div>

        {/* Small screen Navigation */}
        <div className='lg:hidden flex justify-between items-center '>
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
