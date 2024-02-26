import React, { HTMLAttributes, useMemo } from 'react'
import cls from 'classnames'
import { dayjs } from '../config/dayjs';

export interface UiMessageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  content: string
  username: string
  createAt: string
  updatedAt: string
  isEdit: boolean
  isRight?: boolean
  isFirstMsg?: boolean
  isLastMsg?: boolean
}

export const UiMessage = ({ content, isLastMsg, isFirstMsg, username, createAt, isRight, updatedAt, isEdit, ...otherProps }: UiMessageProps) => {
  const time = useMemo(() => {
    if (isEdit) {
      return `edit ${dayjs(updatedAt).format('HH:mm')}`
    }
    return dayjs(createAt).format('HH:mm')
  }, [createAt, updatedAt, isEdit])
  return (
    <div className={cls('flex gap-2 items-end', {
      'mt-2': isFirstMsg,
      'mt-[2px]': !isFirstMsg,
      'flex-row-reverse': isRight,
    })} {...otherProps}>
      { !isRight && <div className={cls('size-[35px] rounded-full bg-slate-500 justify-end', {
        'opacity-0': !isLastMsg
      })}/> }
      <div className={cls(' py-1 rounded-xl px-2 flex flex-col gap-1', {
        'rounded-r-md bg-blue bg-opacity-100': isRight,
        'rounded-l-[4px] bg-white bg-opacity-10': !isRight,
        'rounded-t-xl': isFirstMsg,
        'rounded-b-xl': isLastMsg,
      })}>
        { isFirstMsg && <div className='text-xs text-red-600'>
          { username }
        </div> }
        <div>
          <span className='pr-2 text-sm'>
            { content }
          </span>
          <span className='text-grey text-xs'>
            { time }
          </span>
        </div>
      </div>
    </div>
  )
}