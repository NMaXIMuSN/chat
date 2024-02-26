import { EmojiIcon } from '../../../shared/icons/EmojiIcon';
import { AttachIcon } from '../../../shared/icons/AttachIcon';
import { SendIcon } from '../../../shared/icons/SendIcon';
import { FormEvent, useState } from 'react';
import { Popover } from 'react-tiny-popover'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { getContent } from '../../../entities/message/model/selectors/getContent/getContent';
import { messageInputActions } from '../../../entities/message/model/slice/MessageInput';
import { getEditMessage } from '../../../entities/message/model/selectors/getEditMessage/getEditMessage';
import cls from 'classnames'
import { EditIcon } from '../../../shared/icons/EditIcon';
import { CloseIcon } from '../../../shared/icons/CloseIcon';
interface ChatInputProps {
  className?: string
  onSend?: (message: string) => void | Promise<void>
  onEdit?: (message: string, id: number) => void | Promise<void>
}

export const ChatInput = ({ onSend, onEdit }: ChatInputProps) => {
  const content = useSelector(getContent)
  const editMessage = useSelector(getEditMessage)
  const dispatch = useDispatch()
  const [ isPopoverOpen, setIsPopoverOpen ] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editMessage) {
      await onEdit?.(content, editMessage.id)
    } else{
      await onSend?.(content)
    }
    dispatch(messageInputActions.reset())
  }

  const onEmojiClick = (e: EmojiClickData) => {
    onSetContent(content + e.emoji)
  }

  const onSetContent = (value: string) => {      
    dispatch(messageInputActions.setContent(value))
  }

  return (
    <>
    {editMessage &&
      <div className={cls('p-[13px] flex  justify-between border border-black border-opacity-30 border-b-0 rounded-t-lg bg-white bg-opacity-5')}>
        <div className='flex space-x-3 items-center'>
          <EditIcon width={24} height={24}/>
          <div className='w-[2px] h-full bg-white rounded-lg bg-opacity-50'/>
          <div>
            <div>
              Edit
            </div>
            <div>
              {editMessage.content}
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <CloseIcon stroke='#8A8A8A' onClick={() => dispatch(messageInputActions.reset())}/>
        </div>
      </div>
    }

    <form onSubmit={onSubmit}>
      <div className={cls('p-[13px] border border-black border-opacity-30 flex gap-[20px] bg-white bg-opacity-5 rounded-lg', {
        'rounded-t-none': !!editMessage,
      })}>
        <AttachIcon />
        <input
          className='flex-1 bg-transparent outline-none'
          placeholder='Write a message...'
          value={content}
          onChange={(e) => onSetContent(e.target.value)}
        />
        <Popover
          content={
            <div>
              <EmojiPicker onEmojiClick={onEmojiClick}/>
            </div>
          }
          isOpen={isPopoverOpen}
          onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <div>
            <EmojiIcon onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
          </div>
        </Popover>
        <button type="submit">
          <SendIcon />
        </button>
      </div>
    </form>
    </>
  )
}