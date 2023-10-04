import { IconInterface } from '@/ts/interfaces'
import { BsMap } from 'react-icons/bs'

const MapIcon = ({ color, size = 20 }: IconInterface) => {
  return <BsMap color={color} size={size} />
}

export default MapIcon
