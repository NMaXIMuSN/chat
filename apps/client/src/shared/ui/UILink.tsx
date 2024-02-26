import cls from 'classnames'
import { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface UILinkProps extends LinkProps {
  className?: string
  children?: ReactNode
}

export const UILink = (props: UILinkProps) => {
  const {
    children,
    className,
    ...otherProps
  } = props
  return (
    <Link
      className={cls(className, '')}
      {...otherProps}
    >
      { children }
    </Link>
  )
}