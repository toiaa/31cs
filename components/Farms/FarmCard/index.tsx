import ErrorMessage from '@/components/ErrorMessage'
import { GaugeCardData } from '@/ts/interfaces'
import { ACTIONS_FARM_CARD, ERRORS } from '@/utils/constants'
import { formatInputValue } from '@/utils/methods'
import { isValidBalance } from '@/utils/web3Methods'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import FarmCardAction from './FarmCardAction'
import FarmCardHeader from './FarmCardHeader'
import FarmStats from './FarmStats'

const TransactionStatus = dynamic(() => import('@/components/TransactionStatus'), {
  ssr: false,
})
const FarmCardOption = dynamic(() => import('./FarmCardOption'), {
  ssr: false,
})

function FarmCard({
  plugin,
  protocol,
  gaugeAddress,
  underlyingAddress,
  totalSupply,
  isAlive,
  symbol,
  priceOTOKEN,
  rewardPerToken,
  rewardPerTokenUSD,
  votingWeight,
  accountUnderlyingTokens,
  accountStakedTokens,
  accountEarnedOTOKEN,
}: GaugeCardData) {
  const balance = useMemo(
    () => ({
      Withdraw: accountStakedTokens,
      Deposit: accountUnderlyingTokens,
      Approve: accountUnderlyingTokens,
    }),
    [accountStakedTokens, accountUnderlyingTokens],
  )

  const [value, setValue] = useState<string>('0')
  const [isTransactionActive, setIsTransactionActive] = useState<boolean>(false)
  const [actionSelected, setActionActionSelected] = useState({ action: ACTIONS_FARM_CARD.NOACTION, isSelected: false })
  const { action, isSelected } = actionSelected
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectAction = useCallback((action: string) => {
    if (!action) {
      setActionActionSelected((prevState) => ({ ...prevState, isSelected: false }))
    } else {
      setActionActionSelected({ action, isSelected: true })
    }
  }, [])

  const cancelAction = useCallback(() => {
    setValue('0')
    setActionActionSelected({ action: ACTIONS_FARM_CARD.NOACTION, isSelected: false })
    setErrorMessage('')
  }, [])

  const onTransaction = useCallback((status: boolean) => {
    setIsTransactionActive(status)
  }, [])

  const handleInput = useCallback(
    (typeValue: string) => {
      const newValue = formatInputValue(typeValue, value)
      if (newValue !== value) {
        const selectedBalance = action === 'Withdraw' ? balance.Withdraw : balance.Deposit
        const showError = isValidBalance(newValue, selectedBalance)
        if (showError) {
          setErrorMessage(ERRORS.balance)
        } else {
          setErrorMessage('')
        }

        setValue(newValue)
      }
    },
    [value, action, balance],
  )
  const showOptions = useMemo(
    () => !isSelected || (isSelected && action === ACTIONS_FARM_CARD.CLAIM),
    [isSelected, action],
  )

  return (
    <section className='farm-card-custom relative'>
      <p className='text-gray-subtitle p-0 m-0'>{protocol}</p>
      {isTransactionActive && (
        <TransactionStatus
          handleSelectAction={handleSelectAction}
          action={action}
          rewards={accountEarnedOTOKEN}
          value={value}
          actionSelectedFarms={action}
          onTransaction={onTransaction}
          isFarm
        />
      )}

      <FarmCardHeader tokens={symbol} />
      <div className='flex flex-col justify-between gap-2 h-full'>
        <FarmStats
          rewardPerToken={rewardPerToken}
          rewardPerTokenUSD={rewardPerTokenUSD}
          stakedTokens={totalSupply}
          votingWeight={votingWeight}
        />
        {showOptions && (
          <div className='flex flex-col gap-2 justify-between h-full'>
            <FarmCardOption
              onTransaction={onTransaction}
              action={ACTIONS_FARM_CARD.WITHDRAW}
              handleSelectAction={handleSelectAction}
              actionLabel='Withdraw'
              dataLabel='Staked tokens'
              priceMultiplier={priceOTOKEN}
              dataValue={accountStakedTokens}
              gaugeAddress={gaugeAddress}
            />
            <FarmCardOption
              onTransaction={onTransaction}
              handleSelectAction={handleSelectAction}
              actionLabel='Claim'
              dataLabel='Rewards'
              priceMultiplier={priceOTOKEN}
              dataValue={accountEarnedOTOKEN}
              action={ACTIONS_FARM_CARD.CLAIM}
              gaugeAddress={gaugeAddress}
            />
          </div>
        )}
        <ErrorMessage error={errorMessage} />

        <FarmCardAction
          isAlive={isAlive}
          accountStakedTokens={accountStakedTokens}
          symbol={symbol}
          underlyingAddress={underlyingAddress}
          handleInput={handleInput}
          value={value}
          plugin={plugin}
          action={action}
          balance={balance}
          cancelAction={cancelAction}
          onTransaction={onTransaction}
          handleSelectAction={handleSelectAction}
          isActionSelected={isSelected}
        />
      </div>
    </section>
  )
}

export default FarmCard
