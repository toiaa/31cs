import { IconInterface } from '@/ts/interfaces'
import { FaTrophy } from 'react-icons/fa'

const TrophyIcon = ({ color, size = 20 }: IconInterface) => {
  return <FaTrophy color={color} size={size} />
}

export default TrophyIcon
