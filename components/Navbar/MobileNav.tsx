import { NAVLINKS } from '@/utils/constants'
import NavLink from './NavLink'

const MobileNav = () => {
  return (
    <div
      className={
        'fixed flex flex-row justify-stretch p-1 bottom-0 right-0 left-0 bg-box-dark-neutral z-20 rounded-t-md shadow-secondary'
      }>
      {NAVLINKS.map(({ id, label, path }) => (
        <NavLink key={`${id}-navlink -${label}`} id={id} label={label} path={path} isMobile />
      ))}
    </div>
  )
}

export default MobileNav
