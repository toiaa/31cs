import { useStatusContracts, useStoreRewards } from '@/store'
import { formatUnits } from 'ethers/lib/utils'
import Amount from '../Amount'

function PortfolioData() {
  const { totalRewards, farmingRewards, stakingRewards } = useStoreRewards()
  const { loadingBonding } = useStatusContracts()

  const showTextFarming = farmingRewards.isZero()
  const showTextStaking = stakingRewards.isZero()
  const farmingRewardsNumber = formatUnits(farmingRewards, 18)
  const stakingRewardsNumber = formatUnits(stakingRewards, 18)
  const totalRewardsNumber = formatUnits(totalRewards, 18)

  return (
    <div className='item-portfolio-custom bg-card-neutral gap-3 w-full md:gap-2 lg:gap-3'>
      <div className='flex justify-between items-center w-full'>
        <p className='title'>Portfolio</p>
        <Amount size='lg' amount={totalRewardsNumber} type='price' weight='semibold' />
      </div>
      <div className='flex flex-col w-full justify-start'>
        <div className='flex justify-between items-start'>
          <p>Staking Rewards</p>
          <div className='flex gap-1 items-center text-sm md:text-md lg:text-md'>
            {showTextStaking && !loadingBonding ? (
              <p className='text-base text-subtitle-color '>Get VTOKEN to earn</p>
            ) : (
              <>
                <Amount amount={stakingRewardsNumber} isLoading={loadingBonding} type='price' size='md' />
                <span>/week</span>
              </>
            )}
          </div>
        </div>
        <div className='flex justify-between items-start'>
          <p>Farming Rewards</p>
          <div className='flex'>
            <div className='flex gap-1 items-center text-sm md:text-md lg:text-md'>
              {showTextFarming && !loadingBonding ? (
                <p className='text-base text-subtitle-color '>Get VTOKEN to earn</p>
              ) : (
                <>
                  <Amount size='md' isLoading={loadingBonding} amount={farmingRewardsNumber} type='price' />
                  <span>/week</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioData
