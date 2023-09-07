import { IconInterface } from '@/ts/interfaces'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

const QuestionIcon = ({ color, size = 20 }: IconInterface) => {
  return <AiOutlineQuestionCircle color={color} size={size} />
}

export default QuestionIcon
