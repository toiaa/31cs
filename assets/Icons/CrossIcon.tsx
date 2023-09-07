import { IconInterface } from '@/ts/interfaces'
import { RxCross2 } from 'react-icons/rx'

const CrossIcon = ({ color, size = 20 }: IconInterface) => {
  return <RxCross2 color={color} size={size} />
}

export default CrossIcon
