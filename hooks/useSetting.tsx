import { useStoreSettings } from '@/store'
import { SettingsTabsType } from '@/ts/types'
import { APPROVAL_TABS, SLIPPAGE_TABS, TRANSACTION_SPEED_TABS } from '@/utils/constants'

const useSetting = () => {
  const { deadline, slippage, txSpeed, unlimitedApproval, customSlippage, slippageToletance } = useStoreSettings()

  const updateDeadline = (value: string) => {
    useStoreSettings.setState({ deadline: value })
  }
  const updateSlippage = (value: SettingsTabsType) => {
    useStoreSettings.setState({ slippage: value })
  }

  const updateCustomSlippage = (value: string) => {
    useStoreSettings.setState({ slippage: { ...slippage, value }, customSlippage: value })
  }

  const updateSlippageTolerance = (value: string) => {
    useStoreSettings.setState({ slippageToletance: value })
  }

  const updateSpeed = (value: SettingsTabsType) => {
    useStoreSettings.setState({ txSpeed: value })
  }

  const toggleApprove = (value: SettingsTabsType) => {
    useStoreSettings.setState({ unlimitedApproval: value })
  }

  const reset = () => {
    useStoreSettings.setState({
      deadline: '30',
      slippage: SLIPPAGE_TABS[0],
      txSpeed: TRANSACTION_SPEED_TABS[3],
      unlimitedApproval: APPROVAL_TABS[0],
      customSlippage: '',
    })
  }

  return {
    unlimitedApproval,
    deadline,
    customSlippage,
    slippage,
    txSpeed,
    slippageToletance,
    updateDeadline,
    updateSlippage,
    updateCustomSlippage,
    updateSpeed,
    toggleApprove,
    updateSlippageTolerance,
    reset,
  }
}

export default useSetting
