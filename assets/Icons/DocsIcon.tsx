import { IconInterface } from '@/ts/interfaces'
import { MdOutlineDocumentScanner } from 'react-icons/md'

const DocsIcon = ({ color, size = 20 }: IconInterface) => {
  return <MdOutlineDocumentScanner color={color} size={size} />
}

export default DocsIcon
