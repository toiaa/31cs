import { ToastMessageType } from '@/ts/types'
import { toast } from 'react-toastify'

const useNotification = () => {
  const successToast = (txId: string, description = 'Success') => {
    toast.success(description, { toastId: txId })
  }
  const errorToast = (txId: string, description = 'Error') => {
    toast.error(description, { toastId: txId })
  }
  const pendingToast = async (
    txId: string,
    awaitingTx: () => Promise<(value?: number) => void>,
    message: ToastMessageType,
  ) => {
    const { error, pending, success } = message
    toast.promise(
      awaitingTx,
      {
        pending,
        success,
        error,
      },
      { toastId: txId },
    )
    await awaitingTx()
  }
  return { successToast, errorToast, pendingToast }
}

export default useNotification
