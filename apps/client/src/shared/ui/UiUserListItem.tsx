import React from 'react'
import cls from 'classnames'
import { IUserSchema } from '@typesApp/user'

interface UiUserListItemProps {
  className?: string,
  user: IUserSchema,
  isSelected?: boolean,
  onClick?: (event: IUserSchema) => void | Promise<void>,
}

export const UiUserListItem = ({ className, user, isSelected, onClick }: UiUserListItemProps) => {
  const handleOnClick = async () => {
    await onClick?.(user)
  }

  return (
    <div onClick={handleOnClick} className={cls(className, '')}>
      <div className={cls('ChatItem flex justify-between items-center hover:bg-white hover:bg-opacity-5 p-3 rounded cursor-pointer', {
        'bg-white bg-opacity-5 relative after:content-[""] after:w-[3px] after:h-[28px] after:rounded-full after:bg-[#60CDFF] after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2': isSelected
      })}>
        <div className='flex items-center gap-[10px]'>
          <div className='size-[50px] rounded-full bg-white bg-opacity-20'>

          </div>
          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-lg'>
              {user.username}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}