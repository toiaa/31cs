import { AmountInterface } from '@/ts/interfaces'
import { formatAmount } from '@/utils/methods'
import Skeleton from '../Skeleton'

const Amount = ({ amount, type, color, isLoading, decimals, weight = 'normal', size = 'sm' }: AmountInterface) => {
  if (isLoading) return <Skeleton />
  const amountFormatted = formatAmount(amount, type, decimals)

  return (
    <p
      style={{ color: color ?? 'white' }}
      className={` ${weight === 'bold' ? 'font-bold' : weight === 'semibold' ? 'font-semibold' : 'font-normal'}
       ${size === 'sm' ? 'text-sm lg:text-sm' : size === 'md' ? 'text-md lg:text-md' : 'text-lg lg:text-lg'}
      `}>
      {amountFormatted}
    </p>
  )
}
export default Amount
