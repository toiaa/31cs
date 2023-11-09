import { IconInterface } from '@/ts/interfaces'
import { RiArrowDownSFill } from 'react-icons/ri'

const JoystickArrowsIcon = ({ color = 'white', size = 20, direction }: IconInterface) => {
  if (direction === 'up') return <RiArrowDownSFill className='rotate-180' color={color} size={size} />
  if (direction === 'left') return <RiArrowDownSFill style={{ transform: 'rotate(90deg)' }} color={color} size={size} />
  if (direction === 'right')
    return <RiArrowDownSFill style={{ transform: 'rotate(270deg)' }} color={color} size={size} />
  return <RiArrowDownSFill color={color} size={size} />
}

export default JoystickArrowsIcon
