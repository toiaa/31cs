import { NAVLINKS } from '@/utils/constants'
import React from 'react'
import NavLink from './NavLink'

const Navigation = () => {
  return (
    <div className='lg:flex lg:flex-row flex-col items-center gap-1'>
      {NAVLINKS.map(({ id, label, path }) => (
        <NavLink key={id} label={label} path={path} id={id} />
      ))}
    </div>
  )
}

export default Navigation
