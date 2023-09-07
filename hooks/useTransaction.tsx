import { useStoreTx } from '@/store'

const useTransaction = () => {
  const { txError, txLoading, txPrepared, txSuccess, hash } = useStoreTx()

  const resetTransaction = () => {
    useStoreTx.setState({ txError: false, txLoading: false, txPrepared: false, txSuccess: false, hash: null })
  }

  const updateHash = (hash: string) => {
    useStoreTx.setState({ hash })
  }

  const updateTxStatus = (key: 'txError' | 'txLoading' | 'txPrepared' | 'txSuccess') => {
    if (key === 'txPrepared')
      useStoreTx.setState({ txPrepared: true, txError: false, txLoading: false, txSuccess: false })
    if (key === 'txLoading') useStoreTx.setState({ txError: false, txLoading: true, txSuccess: false })
    if (key === 'txSuccess') useStoreTx.setState({ txError: false, txLoading: false, txSuccess: true })
    if (key === 'txError') useStoreTx.setState({ txError: true, txLoading: false, txSuccess: false })
  }
  return { txError, txLoading, txPrepared, txSuccess, hash, resetTransaction, updateTxStatus, updateHash }
}

export default useTransaction
