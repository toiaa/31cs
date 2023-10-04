import { IconInterface } from '@/ts/interfaces'
import { MdSpeed } from 'react-icons/md'

const SpeedIcon = ({ color, size = 20 }: IconInterface) => {
  return <MdSpeed color={color} size={size} />
}

export default SpeedIcon
