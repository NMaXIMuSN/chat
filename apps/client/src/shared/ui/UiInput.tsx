import React, { InputHTMLAttributes, ReactNode } from 'react'
import cls from 'classnames'
import { v4 as uuidv4 } from 'uuid';

interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string | ReactNode
}

export const UiInput = (props: UiInputProps) => {
  const { className, label, id = uuidv4(), type="text", ...otherProps } = props
  
  const labelHtml = (
    <div className='pb-1'>
      { label }
    </div>
  )

  return (
    <div>
      <label htmlFor={id}>
        { label && labelHtml }
      </label>
      <input
        id={id}
        className={cls("bg-[#2B2D34] py-2 rounded text-lg w-full outline-none px-3 text-opacity-[78.6] border border-transparent focus:border-b-white transition-all border-b-opacity-5", [className])}
        type={type}
        {...otherProps}
      />
    </div>
  )
}