import { ButtonInterface } from '@/ts/interfaces'
import React from 'react'

const Button = ({
  children,
  onClick,
  isDisabled = false,
  isLoading = false,
  isTransparent,
  isFull,
  isSecondary,
  icon,
  textLoading,
  notMinW = false,
}: ButtonInterface) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      className={`gap-2 button-custom capitalize ${!isFull && 'max-w-fit'} 
      ${!isTransparent && isSecondary && 'bg-transparent border border-button-main-darkest text-secondary-color'}
      border ${isTransparent && !isSecondary && 'bg-transparent border-transparent'}
      ${notMinW ? 'button-no-min-width' : 'button-min-width'} `}
      type='button'
      onClick={onClick}>
      {icon && icon}
      {isLoading ? textLoading ?? 'Loading' : children}
    </button>
  )
}

export default Button
