import Amount from '@/components/Amount'
import Button from '@/components/Button'
import ClaimFarmsButton from '@/components/Farms/FarmCard/FarmsClaimButton'
import { useStoreAccount } from '@/store'
import { FarmCardOptionInterface } from '@/ts/interfaces'
import { ACTIONS_FARM_CARD } from '@/utils/constants'
import { BigNumber } from 'ethers'
import { formatEther, formatUnits } from 'ethers/lib/utils'
import React from 'react'

function FarmCardOption({
  actionLabel,
  handleSelectAction,
  dataLabel,
  dataValue,
  priceMultiplier,
  action,
  gaugeAddress,
  onTransaction,
}: FarmCardOptionInterface) {
  const { isConnected } = useStoreAccount()
  const price = dataValue.mul(priceMultiplier)
  const formatPrice = formatUnits(price, 36)
  const isClaim = action === ACTIONS_FARM_CARD.CLAIM
  const disableOption = dataValue.lte(BigNumber.from(0))
  const formatValue = formatEther(dataValue)
  const handleOptionButton = () => {
    handleSelectAction(action)
  }
  return (
    <section className='farm-card-items-custom'>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col'>
          <div className='flex gap-1 items-center'>
            <p className='text-gray-subtitle'>{dataLabel}</p>
            {dataLabel === 'Rewards' && <p className='text-xs'>{'(oTOKEN)'}</p>}
          </div>
          <Amount weight='bold' amount={formatValue} decimals={3} type='number' />
          {dataLabel === 'Rewards' && <Amount amount={formatPrice} type='price' decimals={2} />}
        </div>
        <div className='flex items-center w-1/3'>
          {isClaim && (
            <ClaimFarmsButton
              disableClaim={disableOption}
              onTransaction={onTransaction}
              gaugeAddress={gaugeAddress}
              handleSelectAction={handleSelectAction}
            />
          )}
          {!isClaim && (
            <Button notMinW isDisabled={!isConnected || disableOption} onClick={handleOptionButton} isFull>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default FarmCardOption
