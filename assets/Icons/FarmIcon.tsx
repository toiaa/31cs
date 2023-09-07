import { IconInterface } from '@/ts/interfaces'
import { TbTractor } from 'react-icons/tb'

const FarmIcon = ({ color, size = 20 }: IconInterface) => {
  return <TbTractor color={color} size={size} />
}

export default FarmIcon
