import { IconInterface } from '@/ts/interfaces'
import { AiOutlineHome } from 'react-icons/ai'

const HomeIcon = ({ color, size = 20 }: IconInterface) => {
  return <AiOutlineHome color={color} size={size} />
}

export default HomeIcon
