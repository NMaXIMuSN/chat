import cls from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface UiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
}

export const UiButton = (props: UiButtonProps) => {
  const {
    className,
    children, 
    ...otherProps
  } = props
  return (
    <button
      className={ cls(className, 'px-3 py-2 bg-chat-bg hover:opacity-80 transition-all rounded') }
      {...otherProps}
    >
      { children }
    </button>
  )
}