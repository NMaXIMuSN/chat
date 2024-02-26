import { useContext, useEffect } from 'react'
import cls from 'classnames'
import { GetChatByChatName } from '../../../shared/config/api/chatRequest';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getChatParticipants } from '../../../entities/chat/model/selectors/getChatParticipats/getChatParticipats';
import { getChatMessages } from '../../../entities/chat/model/selectors/getChatMessages/getChatMessages';
import { SocketContext } from '../../../app/providers/SocketContext/config/SocketContext';
import { getUser } from '../../../entities/user/model/selectors/getUser/getUser';
import { ChatActions } from '../../../entities/chat/model/slice/ChatSlice';
import { ChatHeader } from '../../../widgets/ChatHeader/ui/ChatHeader'; 
import { ChatInput } from '../../../widgets/ChatIinput/ui/ChatInput';
import { MessagesList } from '../../../widgets/Message';

interface ChatProps {
  className?: string
}

export const Chat = ({ className }: ChatProps) => {
  const { chat } = useParams()
  const participants = useSelector(getChatParticipants)
  const messages = useSelector(getChatMessages)
  const user = useSelector(getUser)
  const { socket } = useContext(SocketContext)

  const dispatch = useDispatch()

  

  useEffect(() => {
    if (!chat) {
      return
    }

    GetChatByChatName(chat)
    .then((data) => {
        dispatch(ChatActions.setCurrentChat(chat))
        dispatch(ChatActions.setChat({
          chatName: chat,
          messages: data.messages,
          participants: data.users.filter((_user) => _user.id !== user?.id),
          isVisited: true,
          updatedAt: data.updatedAt,
        }))
      })
  }, [chat, dispatch, user?.id])

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('message', (data) => {
      dispatch(ChatActions.pushNewMessages({chatName: chat as string, message: data}))
    })

    socket.on('delete-message', (data) => {
      dispatch(ChatActions.deleteMessages({chatName: data.chat as string, messageId: data.messageId as number}))
    })

    socket.on('edit-message', (data) => {
      dispatch(ChatActions.updatedMessage(data))
    })


    return () => {
      socket.off('message')
      socket.off('delete-message')
      socket.off('edit-message')
      
    }
  }, [chat, dispatch, socket])

  const sendMessage = (message: string) => {
    if (!socket) {
      return
    }

    socket.emit('message', {
      content: message,
      type: 'text',
      participants: participants,
      user: user,
      chat
    })
  }

  const editMessage = (message: string, id: number) => {
    if (!socket) {
      return
    }

    socket.emit('edit-message', {
      content: message,
      id
    })
  }


  if (!participants?.length) {
    return <div>err</div>
  }

  return (
    <div className={cls(className, 'flex flex-col h-[-webkit-fill-available] pb-3')}>
      <ChatHeader username={participants[0]?.username}/>
      <MessagesList  messages={messages || []}/>
      <div className='px-8'>
        <ChatInput onSend={sendMessage} onEdit={editMessage}/>
      </div>
    </div>
  )
}