import { IconInterface } from '@/ts/interfaces'
import { BiLinkExternal } from 'react-icons/bi'

const ExternalLinkIcon = ({ color, size = 20 }: IconInterface) => {
  return <BiLinkExternal color={color} size={size} />
}

export default ExternalLinkIcon
