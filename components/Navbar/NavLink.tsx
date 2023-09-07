import ClaimIcon from '@/assets/Icons/ClaimIcon'
import DocsIcon from '@/assets/Icons/DocsIcon'
import FarmIcon from '@/assets/Icons/FarmIcon'
import GovernanceIcon from '@/assets/Icons/GovernanceIcon'
import HomeIcon from '@/assets/Icons/HomeIcon'
import VoteIcon from '@/assets/Icons/VoteIcon'
import { NavInterface } from '@/ts/interfaces'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const NavLink = ({ path, id, isMobile, label }: NavInterface) => {
  const router = useRouter()
  const isCurrent = router.pathname === path
  const renderIcon = () => {
    if (id === 'home') return <HomeIcon />
    if (id === 'farms') return <FarmIcon />
    if (id === 'vote') return <VoteIcon />
    if (id === 'claim') return <ClaimIcon />
    if (id === 'governance') return <GovernanceIcon />
    if (id === 'docs') return <DocsIcon />
    return <HomeIcon />
  }
  return (
    <Link
      href={path}
      target={id === 'governance' || id === 'docs' ? '_blank' : '_self'}
      className={`flex gap-1 p-2 cursor-pointer transition-ease ${isMobile && 'nav-mobile'} ${
        isCurrent && 'selected-nav'
      } `}>
      {isCurrent ? renderIcon() : isMobile ? renderIcon() : null}
      <p className='transition-ease'>{label}</p>
    </Link>
  )
}

export default NavLink
