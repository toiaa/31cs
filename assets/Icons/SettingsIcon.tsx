import { IconInterface } from '@/ts/interfaces'
import { FiSettings } from 'react-icons/fi'

const SettingsIcon = ({ color, size = 20 }: IconInterface) => {
  return <FiSettings color={color} size={size} />
}

export default SettingsIcon
