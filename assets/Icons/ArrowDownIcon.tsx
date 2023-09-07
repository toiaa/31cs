import { IconInterface } from '@/ts/interfaces'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const ArrowDownIcon = ({ color, size = 20 }: IconInterface) => {
  return <MdOutlineKeyboardArrowDown color={color} size={size} />
}

export default ArrowDownIcon
