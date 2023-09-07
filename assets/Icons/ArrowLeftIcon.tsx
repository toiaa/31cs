import { IconInterface } from '@/ts/interfaces'
import { BiArrowBack } from 'react-icons/bi'

const ArrowLeftIcon = ({ color = 'white', size = 20 }: IconInterface) => {
  return <BiArrowBack color={color} size={size} />
}

export default ArrowLeftIcon
