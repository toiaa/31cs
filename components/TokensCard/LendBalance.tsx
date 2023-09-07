import useBalance from '@/hooks/useBalance'
import { useStoreAccount, useStoreStats } from '@/store'
import { TOKENS } from '@/utils/tokens'
import { formatEther } from 'ethers/lib/utils'
import React from 'react'
import Amount from '../Amount'

const LendBalance = () => {
  const { chainId } = useStoreAccount()
  const store = useStoreStats()
  const { Credit, Debt, VotingPower, WRAPPED } = TOKENS[chainId]
  const { getBalance } = useBalance()
  const creditBalance = getBalance(Credit.id)
  const debitBalance = getBalance(Debt.id)
  const votingPowerBalance = getBalance(VotingPower.id)
  const formatCreditBalance = formatEther(creditBalance)
  const formatDebitBalance = formatEther(debitBalance)
  const formatVotingPowerBalance = formatEther(votingPowerBalance)
  const formatVTOKEN_APR = formatEther(store['apr'])
  return (
    <div className='flex flex-col lg:w-[200px] text-sm'>
      <div className='flex gap-1 w-full items-center'>
        <p className='font-semibold text-button-secondary-color'>APR</p>
        <Amount amount={formatVTOKEN_APR} type='percentage' decimals={2} color='#a78bfa' />
      </div>
      <div className='flex gap-1 w-full items-center'>
        <p className='font-semibold'>Voting Power</p>
        <Amount amount={formatVotingPowerBalance} type='number' decimals={4} />
      </div>
      <div className='flex gap-1 w-full items-center'>
        <p className='font-semibold'>Credit</p>
        <Amount amount={formatCreditBalance} type='number' decimals={4} />
        <p>{WRAPPED.symbol}</p>
      </div>
      <div className='flex gap-1 w-full items-center'>
        <p className='font-semibold'>Debt</p>
        <Amount amount={formatDebitBalance} type='number' decimals={4} />
        <p>{WRAPPED.symbol}</p>
      </div>
    </div>
  )
}

export default LendBalance
