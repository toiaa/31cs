import QuestionIcon from '@/assets/Icons/QuestionIcon'
import { IconInterface } from '@/ts/interfaces'
import IconButton from '../Button/IconButton'

function TooltipQuestion({ color = 'gray', maxWidth = '200px', text }: IconInterface) {
  return (
    <div className='group relative text-start'>
      <IconButton>
        <QuestionIcon color={color} />
      </IconButton>
      <div
        className={`absolute flex -right-10 lg:left-6 lg:-top-3 scale-0 w-[150px] md:w-[150px] lg:w-[${maxWidth}] px-3 py-1 transition-all rounded text-xs text-white group-hover:scale-100 bg-input border border-gray-borders z-20`}>
        {text && text}
      </div>
    </div>
  )
}

export default TooltipQuestion
