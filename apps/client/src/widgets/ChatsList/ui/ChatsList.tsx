import React, { useEffect } from 'react'
import cls from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { getChatList } from '../../../entities/chat/model/selectors/getChatList/getChatList';
import { GetChatsByUserId } from '../../../shared/config/api/chatRequest';
import { ChatActions } from '../../../entities/chat/model/slice/ChatSlice';
import { useNavigate } from 'react-router-dom';
import { getCurrentChat } from '../../../entities/chat/model/selectors/getCurrentChat/getCurrentChat';
import { dayjs } from '../../../shared/config/dayjs';

interface ChatsListProps {
  className?: string
}

export const ChatsList = ({ className }: ChatsListProps) => {
  const chats = useSelector(getChatList)
  const currentChat = useSelector(getCurrentChat)
  const dispatch = useDispatch()


  const navigate = useNavigate()

  useEffect(() => {
    GetChatsByUserId()
      .then(chats => {
        dispatch(ChatActions.setChatsForArr(chats))
      })
  }, [dispatch])
  return (
    <div
      className={cls(className, '')}
    >
        {chats.map((chat, index) => (
            <div key={index} className={cls('ChatItem flex justify-between items-center hover:bg-white hover:bg-opacity-5 p-3 rounded cursor-pointer', {
              'bg-white bg-opacity-5 relative after:content-[""] after:w-[3px] after:h-[28px] after:rounded-full after:bg-[#60CDFF] after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2': chat.name === currentChat?.name
            })} onClick={() => navigate(`/${chat.name}`)}>
              <div className='flex items-center gap-[10px]'>
                <div className='size-[50px] rounded-full bg-white bg-opacity-20'>

                </div>
                <div className='flex flex-col gap-1'>
                  <div className='font-semibold text-lg'>
                    { chat.participants[0]?.username }
                  </div>
                  <div className='text-sm text-grey-primary'>
                    {chat.messages[chat.messages.length - 1]?.content}
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='uppercase text-sm text-grey-primary'>
                  { dayjs(chat.messages[chat.messages.length - 1]?.createdAt).format('HH:mm') }
                </div>
                <div className='flex flex-row-reverse'>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3251 2.61785C12.3599 1.65257 10.7326 1.91665 10.1221 3.13764L8.39285 6.59609C8.22855 6.92468 7.94939 7.18155 7.60829 7.31799L4.01834 8.75397C3.35177 9.0206 3.17498 9.88191 3.68262 10.3896L6.29289 12.9998L3 16.2927V16.9998H3.70711L7 13.7069L9.61027 16.3172C10.1179 16.8248 10.9792 16.648 11.2459 15.9815L12.6818 12.3915C12.8183 12.0504 13.0751 11.7713 13.4037 11.607L16.8622 9.87775C18.0832 9.26725 18.3472 7.63996 17.382 6.67468L13.3251 2.61785Z" fill="#838383"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}