import { IMessageSchema } from "@typesApp/chat"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from '../../../entities/user/model/selectors/getUser/getUser';
import { useCallback, useContext, useEffect, useRef } from "react";
import { Item, ItemParams, Menu, TriggerEvent, useContextMenu } from "react-contexify";
import { UiMessage } from '../../../shared/ui/UiMessage';
import { SocketContext } from '../../../app/providers/SocketContext/config/SocketContext';
import { getCurrentChat } from '../../../entities/chat/model/selectors/getCurrentChat/getCurrentChat';

import 'react-contexify/dist/ReactContexify.css'
import { messageInputActions } from '../../../entities/message/model/slice/MessageInput';
import { getIsEdit } from '../../../entities/message/model/selectors/getIsEdit/getIsEdit';

interface UiMessagesListProps {
  messages: IMessageSchema[],
}

const MENU_ID = 'messages'

export const MessagesList = ({ messages }: UiMessagesListProps) => {
  const user = useSelector(getUser)
  const currentChat = useSelector(getCurrentChat)
  const isEdit = useSelector(getIsEdit)
  const refMsgList = useRef<HTMLDivElement>(null)
  const { socket }= useContext(SocketContext)

  const dispatch = useDispatch()

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleContextMenu = (event: TriggerEvent & {data: IMessageSchema}) => {  
    if (event.data.userId !== user?.id) {
      return
    }  

    show({
      event,
      props: event.data,
    })
  }

  const handleItemDelete = (event: ItemParams<IMessageSchema, unknown>) => {
    socket?.emit('delete-message', {
      messageId: event.props?.id,
      chat: currentChat?.name
    })
  }

  const handleItemEdit = (event: ItemParams<IMessageSchema, unknown>) => {
    if (!event.props) {
      return
    }
    
    dispatch(messageInputActions.setIsEditMessage(event.props))
  }


  const scrollToBottomMsgList = useCallback(() => {
    if(refMsgList.current) {
        refMsgList.current.scroll({ top: refMsgList.current.scrollHeight, behavior: "smooth"})
        return
      }
  }, [])

  useEffect(() => {
    scrollToBottomMsgList()
  }, [messages, scrollToBottomMsgList, isEdit])
  return (
    <>
    <div className='flex-1 px-8 overflow-y-auto mb-2' ref={refMsgList}>
      {messages.map((msg, index, arr) => (
        <UiMessage onContextMenu={(e) => {
          e.preventDefault()
          handleContextMenu({...e, data: msg})
        }} key={msg.id} id={msg.id.toString()} updatedAt={msg.updatedAt} content={msg.content} isEdit={msg.isEdit} username={msg?.user?.username} createAt={msg.createdAt} isRight={msg.userId === user?.id} isFirstMsg={arr[index - 1]?.userId !== msg.userId} isLastMsg={arr[index + 1]?.userId !== msg.userId}/>
        ))}
    </div>

    <Menu theme="dark" animation="flip" id={MENU_ID}>
      <Item id="delete" onClick={handleItemDelete}>Delete</Item>
      <Item id="edit" onClick={handleItemEdit}>Edit</Item>
    </Menu>
    </>
  )
}