import Amount from '@/components/Amount'
import Button from '@/components/Button'
import ClaimAction from '@/components/WebButtons/ClaimAction'
import { useStoreAccount, useStoreBribes } from '@/store'
import { getTokenRewards } from '@/utils/methods'

function ClaimModal({ onClose }: { onClose: () => void }) {
  const { chainId } = useStoreAccount.getState()
  const { bribes } = useStoreBribes()
  const rewardTokens = getTokenRewards(bribes, chainId)
  const hasRewards = Object.values(rewardTokens).some((value) => value !== 0)
  return (
    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50'>
      <div className='border border-box-dark-neutral rounded-lg shadow-lg relative flex flex-col w-full bg-box max-w-sm'>
        <div className='flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t'>
          <h3 className='text-xl font-bold'> Claim Total Voting Rewards </h3>
        </div>
        <div className='w-full flex flex-col p-4 items-start'>
          {hasRewards ? (
            <>
              <h5 className='font-semibold'>Your Rewards:</h5>
              {Object.entries(rewardTokens).map(([symbol, value], i) => (
                <div key={`${symbol}-reward-${i}`} className='w-full flex justify-start items-center'>
                  <p className='w-16'>{`${symbol}:`}</p>
                  <Amount amount={value.toString()} type='number' decimals={4} />
                </div>
              ))}
            </>
          ) : (
            <p className='font-semibold'>There is not rewards to claim</p>
          )}
        </div>
        <div className='flex items-center justify-center gap-3 p-4'>
          <Button onClick={onClose}>Close</Button>
          <ClaimAction notRewards={!hasRewards} />
        </div>
      </div>
    </div>
  )
}

export default ClaimModal
