import { IconInterface } from '@/ts/interfaces'
import { BsCheck2 } from 'react-icons/bs'

const CheckIcon = ({ color, size = 20 }: IconInterface) => {
  return <BsCheck2 color={color} size={size} />
}

export default CheckIcon
