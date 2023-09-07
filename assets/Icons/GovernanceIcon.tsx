import { IconInterface } from '@/ts/interfaces'
import { RiGovernmentLine } from 'react-icons/ri'

const GovernanceIcon = ({ color, size = 20 }: IconInterface) => {
  return <RiGovernmentLine color={color} size={size} />
}

export default GovernanceIcon
