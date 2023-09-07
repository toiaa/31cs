import CheckIcon from '@/assets/Icons/CheckIcon'
import CrossIcon from '@/assets/Icons/CrossIcon'
import React from 'react'

const CheckStatus = ({ isCheck = false }: { isCheck?: boolean }) => {
  if (isCheck) return <CheckIcon />
  return <CrossIcon />
}

export default CheckStatus
