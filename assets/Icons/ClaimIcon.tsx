import { IconInterface } from '@/ts/interfaces'
import { GiReceiveMoney } from 'react-icons/gi'

const ClaimIcon = ({ color, size = 20 }: IconInterface) => {
  return <GiReceiveMoney color={color} size={size} />
}

export default ClaimIcon
