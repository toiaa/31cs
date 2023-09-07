import { TokenInfoSectionI } from '@/ts/interfaces'
import Image from 'next/image'
import DetailAmount from './DetailAmount'
const SIZE = 30

const TokenInfoSection = ({
  onOpenBribe,
  items,
  img,
  symbol,
  detailAmountProps,
  showLend,
  isLoading,
  showMaxWithdraw,
}: TokenInfoSectionI) => {
  const isNotVotingPower = symbol !== 'Voting Power'
  const [detailAmount, detailMaxWithdraw, detailVotingPower, detailLendAmount] = detailAmountProps

  return (
    <div className='flex flex-col w-full justify-between items-end h-[68px]'>
      <div
        onClick={onOpenBribe}
        className={`flex justify-end gap-2 p-2 rounded-md items-center h-[35px] transition-all ${
          items && 'cursor-pointer hover:bg-box-pale-neutral'
        }`}>
        <p className='text-bold text-[18px] sm:text-[24px]'>{symbol}</p>
        {isNotVotingPower && <Image className='w-fit' src={img} alt='token' width={SIZE} height={SIZE} />}
      </div>
      <div className='flex flex-col items-end'>
        {showLend && <DetailAmount {...detailLendAmount} isLoading={isLoading} />}
        {showMaxWithdraw && <DetailAmount {...detailMaxWithdraw} isLoading={isLoading} />}

        {isNotVotingPower ? (
          <DetailAmount {...detailAmount} isLoading={isLoading} />
        ) : (
          <DetailAmount {...detailVotingPower} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}

export default TokenInfoSection
