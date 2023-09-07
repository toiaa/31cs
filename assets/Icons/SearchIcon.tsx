import { IconInterface } from '@/ts/interfaces'
import { BiSearch } from 'react-icons/bi'

const SearchIcon = ({ color, size = 20 }: IconInterface) => {
  return <BiSearch color={color} size={size} />
}

export default SearchIcon
