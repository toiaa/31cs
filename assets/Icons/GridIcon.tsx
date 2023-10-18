import { IconInterface } from '@/ts/interfaces'
import { AiOutlineTable } from 'react-icons/ai'

const GridIcon = ({ color, size = 20 }: IconInterface) => {
  return <AiOutlineTable color={color} size={size} />
}

export default GridIcon
