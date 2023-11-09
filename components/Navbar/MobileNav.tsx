import ArrowDownIcon from '@/assets/Icons/ArrowDownIcon'
import { NAVLINKS } from '@/utils/constants'
import { useState } from 'react'
import NavLink from './NavLink'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div
      className={`fixed flex flex-col bottom-0 right-0 left-0 z-20 ${
        isOpen ? 'translate-y-20' : 'translate-y-0'
      }  transform transition-transform w-full items-center`}>
      <div onClick={handleClick} className='flex justify-center cursor-pointer bg-box-dark-neutral w-fit rounded-t-md'>
        <div className={`flex justify-center  ${isOpen ? 'rotate-180' : 'rotate-0'} transform transition-transform`}>
          <ArrowDownIcon size={40} />
        </div>
      </div>

      <div className='flex bg-box-dark-neutral rounded-t-md shadow-secondary justify-stretch p-1 w-full'>
        {NAVLINKS.map(({ id, label, path }) => (
          <NavLink key={`${id}-navlink -${label}`} id={id} label={label} path={path} isMobile />
        ))}
      </div>
    </div>
  )
}

export default MobileNav
