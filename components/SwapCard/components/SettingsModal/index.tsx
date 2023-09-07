import ArrowLeftIcon from '@/assets/Icons/ArrowLeftIcon'
import SettingsIcon from '@/assets/Icons/SettingsIcon'
import IconButton from '@/components/Button/IconButton'
import TooltipQuestion from '@/components/TooltipQuestion'
import useSetting from '@/hooks/useSetting'
import { APPROVAL_TABS, SLIPPAGE_TABS, TRANSACTION_SPEED_TABS } from '@/utils/constants'
import { memo, useState } from 'react'
import { MouseEvent } from 'react'
import Button from '../../../Button'
import DeadlineMinutes from './DeadlineMinutes'
import SettingsTabs from './SettingsTabs'
import Slippage from './Slippage'
const SettingModal = () => {
  const {
    unlimitedApproval,
    deadline,
    slippage,
    txSpeed,
    customSlippage,
    toggleApprove,
    updateSpeed,
    updateSlippage,
    reset,
  } = useSetting()
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => {
    setShowModal(!showModal)
  }
  const StopPropagation = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const onSelectApprovalTab = (index: number) => {
    toggleApprove(APPROVAL_TABS[index])
  }

  const onSelectSlippageTab = (index: number) => {
    if (index === 4) {
      updateSlippage({ ...SLIPPAGE_TABS[index], value: customSlippage })
    } else {
      updateSlippage(SLIPPAGE_TABS[index])
    }
  }

  const onSelectSpeedTab = (index: number) => {
    updateSpeed(TRANSACTION_SPEED_TABS[index])
  }
  return (
    <>
      <div className='flex w-full items-end justify-end px-2'>
        <IconButton onClick={handleCloseModal}>
          <SettingsIcon color='white' />
        </IconButton>
      </div>
      {showModal && (
        <div
          onClick={handleCloseModal}
          className='absolute z-10 bg-box-pale-neutral bg-opacity-80 rounded flex-center top-0 right-0 bottom-0 left-0 h-100% text-center'>
          <div
            className='border border-gray-borders flex flex-col gap-3 bg-modal-neutral px-5 py-5 rounded-md w-4/5'
            onClick={StopPropagation}>
            <div className='w-100% flex items-center gap-6 justify-end'>
              <div className='flex gap-4 w-full'>
                <IconButton onClick={handleCloseModal} isTransparent>
                  <ArrowLeftIcon color='white' />
                </IconButton>
                <h3 className='font-bold'>Swap Settings</h3>
              </div>
              <div className='font-semibold text-main-400'>
                <Button onClick={reset} isTransparent>
                  reset
                </Button>
              </div>
            </div>
            <div className='w-100% flex flex-col gap-6 '>
              <div className='flex flex-col gap-2 w-full items-start '>
                <p>General Settings</p>
                <div className='flex items-center gap-2'>
                  <p className='font-thin text-sm text-gray-subtitle'>Token approval permissions</p>
                  <TooltipQuestion text='choose for a one time approval or an unlimited one for the token' />
                </div>
                <SettingsTabs activeTabId={unlimitedApproval.id} onSelect={onSelectApprovalTab} list={APPROVAL_TABS} />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <div className='flex text-md flex-col items-start gap-2 w-full'>
                  <p>Transaction settings</p>
                  <div className='flex items-center gap-2'>
                    <p className='font-thin text-sm text-gray-subtitle'>Loss Tolerance</p>
                    <TooltipQuestion text='choose a loss tolerance percentage for this transaction' />
                  </div>
                  <Slippage activeTabId={slippage.id} onSelect={onSelectSlippageTab} list={SLIPPAGE_TABS} />
                </div>
                <div className='flex text-md flex-col items-start gap-2 w-full'>
                  <div className='flex items-center gap-2'>
                    <p className='font-thin text-sm text-gray-subtitle'>Transaction speed (GWEI)</p>
                    <TooltipQuestion text='choose for a transaction speed for this transaction' />
                  </div>
                  <SettingsTabs activeTabId={txSpeed.id} onSelect={onSelectSpeedTab} list={TRANSACTION_SPEED_TABS} />
                </div>
                <div className='flex text-md flex-row justify-between items-center w-full'>
                  <div className='flex items-center gap-2'>
                    <p className='font-thin text-sm text-gray-subtitle'>Transaction deadline in minutes</p>
                    <TooltipQuestion text='Limit time for the transaction to happen' />
                  </div>
                  <DeadlineMinutes minutes={deadline} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(SettingModal)
