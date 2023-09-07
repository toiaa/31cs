import { IconInterface } from '@/ts/interfaces'
import { BsFilterRight } from 'react-icons/bs'

const CheckBoxIcon = ({ color, size = 20 }: IconInterface) => {
  return <BsFilterRight color={color} size={size} />
}

export default CheckBoxIcon
