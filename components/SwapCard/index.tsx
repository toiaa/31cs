import useInput from '@/hooks/useInput'
import { useStoreAccount, useStoreAction } from '@/store'
import { resetStatus } from '@/store/methods'
import { Token } from '@/ts/types'
import { TABS, TABS_LIST } from '@/utils/constants'
import { TOKENS } from '@/utils/tokens'
import React, { useCallback, useMemo, useState } from 'react'
import TransactionStatus from '../TransactionStatus'
import SettingModal from './components/SettingsModal/index'
import SecondaryTabs from './SecondaryTabs'
import SwapPanel from './SwapPanel'
import Tabs from './Tabs'

const SwapCard = () => {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)
  const [currentTabOption, setCurrentTabOption] = useState({ tab: TABS[0], option: 0 })
  const { chainId } = useStoreAccount()
  const { resetInputs } = useInput()

  const { Credit, Debt, WRAPPED, OTOKEN, TOKEN, VTOKEN, VotingPower } = TOKENS[chainId]
  const currentTokens: Token[] = useMemo(() => {
    const { option, tab } = currentTabOption
    // Swap
    if (tab.id === 0) {
      if (option === 0) return [WRAPPED, TOKEN]
      return [TOKEN, WRAPPED]
    }
    // Options
    if (tab.id === 1) {
      if (option === 0) return [OTOKEN, TOKEN, WRAPPED]
      return [TOKEN, WRAPPED, WRAPPED]
    }
    // Earn
    if (tab.id === 2) {
      if (option === 0) return [TOKEN, VTOKEN]
      if (option === 2) return [OTOKEN, VotingPower]
      return [VTOKEN, TOKEN]
    }
    // Lend
    if (tab.id === 3) {
      if (option === 0) return [WRAPPED, Debt]
      return [WRAPPED, Credit]
    }
    // Default
    return [WRAPPED, TOKEN]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, currentTabOption])

  const { option, tab } = currentTabOption
  const updateTab = useCallback(
    (index: number) => {
      const newTab = TABS[index]
      const { tab } = currentTabOption
      if (tab.id === 0 && newTab.id !== 0) {
        resetInputs()
        useStoreAction.setState({ isBuy: true })
      } else if (tab.id !== 0 && newTab.id === 0) {
        resetInputs()
      } else if (tab.id !== 0 && newTab.id === 1) {
        resetInputs()
      }
      setCurrentTabOption((prevState) => ({ ...prevState, tab: newTab, option: 0 }))
      resetStatus()
    },
    [currentTabOption, resetInputs],
  )

  const updateOption = useCallback(
    (index: number) => {
      if (tab.id === 0) {
        useStoreAction.setState({ isBuy: index === 0 ?? false })

        resetInputs()
      }
      setCurrentTabOption((prevState) => ({ ...prevState, option: index }))
      resetStatus()
    },
    [resetInputs, tab],
  )

  const handleTransactionStatus = useCallback((status: boolean) => {
    setIsTransactionOpen(status)
  }, [])

  return (
    <div className='card-swap relative flex flex-col justify-between'>
      {isTransactionOpen && <TransactionStatus />}
      <div className='flex flex-col gap-1'>
        <Tabs activeTab={tab.id} list={TABS_LIST[chainId]} onUpdate={updateTab} />
        <SecondaryTabs activeTab={option} list={tab.options} onUpdate={updateOption} />
      </div>
      <SettingModal />
      <SwapPanel
        onTransactionStatus={handleTransactionStatus}
        currentOption={tab.options[option]}
        currentAction={tab.name}
        currentTokens={currentTokens}
      />
    </div>
  )
}

export default SwapCard
