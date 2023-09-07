import { LinkProps } from '@/ts/interfaces'

function IconContainer({ children }: LinkProps) {
  return <div className='hover:opacity-50 transition-ease cursor-pointer'>{children}</div>
}

export default IconContainer
