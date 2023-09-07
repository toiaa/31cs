import { IconInterface } from '@/ts/interfaces'
import { MdOutlineHowToVote } from 'react-icons/md'

const VoteIcon = ({ color, size = 20 }: IconInterface) => {
  return <MdOutlineHowToVote color={color} size={size} />
}

export default VoteIcon
