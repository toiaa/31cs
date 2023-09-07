import { IconInterface } from '@/ts/interfaces'
import { BiStopwatch } from 'react-icons/bi'

const StopwatchIcon = ({ color, size = 20 }: IconInterface) => {
  return <BiStopwatch color={color} size={size} />
}

export default StopwatchIcon
