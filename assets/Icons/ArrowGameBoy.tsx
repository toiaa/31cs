import { IconInterface } from '@/ts/interfaces'
import { BiSolidLeftArrow } from 'react-icons/bi'
const ArrowGameBoy = ({ onClick, color = 'white', size = 20 }: IconInterface) => {
  return <BiSolidLeftArrow onClick={onClick} color={color} size={size} />
}

export default ArrowGameBoy
