import React from 'react'

const ErrorMessage = ({ error }: { error: string }) => {
  if (error === '') return null
  return <p className='border-red-300 border p-2 text-sm font-semibold text-red-400 rounded-lg text-center'>{error}</p>
}

export default ErrorMessage
