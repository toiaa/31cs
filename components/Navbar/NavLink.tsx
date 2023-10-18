import DocsIcon from '@/assets/Icons/DocsIcon'
import GridIcon from '@/assets/Icons/GridIcon'
import HomeIcon from '@/assets/Icons/HomeIcon'
import { NavInterface } from '@/ts/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const NavLink = ({ path, id, isMobile, label }: NavInterface) => {
  const router = useRouter()
  const isCurrent = router.pathname === path
  const renderIcon = () => {
    if (id === 'home') return <HomeIcon />
    if (id === 'docs') return <DocsIcon />
    if (id === 'grid') return <GridIcon />
    return <HomeIcon />
  }
  return (
    <Link
      href={path}
      target={id === 'docs' ? '_blank' : '_self'}
      className={`flex gap-1 p-2 cursor-pointer transition-ease ${isMobile && 'nav-mobile'} ${
        isCurrent && 'selected-nav'
      } `}>
      {isCurrent ? renderIcon() : isMobile ? renderIcon() : null}
      <p className='transition-ease'>{label}</p>
    </Link>
  )
}

export default NavLink
