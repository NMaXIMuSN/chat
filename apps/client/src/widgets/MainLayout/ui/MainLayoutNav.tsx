import cls from 'classnames'
import { NavHeader } from '../../NavHeader/ui/NavHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchUsers } from '../../../entities/searchUsers/model/selectors/getSearchUsers/getSearchUsers';
import { UiUserListItem } from '../../../shared/ui/UiUserListItem';
import { IUserSchema } from '@typesApp/user';
import { getUser } from '../../../entities/user/model/selectors/getUser/getUser';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatActions } from '../../../entities/chat/model/slice/ChatSlice';
import { ChatsList } from '../../ChatsList/ui/ChatsList';

interface MainLayoutNavProps {
  className?: string
}

export const MainLayoutNav = ({ className }: MainLayoutNavProps) => {
  const users = useSelector(getSearchUsers)
  const currentUser = useSelector(getUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const selectChat = useCallback((user: IUserSchema) => {
    if (!currentUser) {
      return
    }

    const chatName = `${Math.min(currentUser.id, user.id)}_${Math.max(currentUser.id, user.id)}`

    dispatch(ChatActions.setChat({
      chatName,
      messages: [],
      participants: [
        user
      ]
    }))
    dispatch(ChatActions.setCurrentChat(chatName))

    navigate(`/${chatName}`)
  }, [currentUser, navigate, dispatch])

  const list = users.length
    ? users.map((user) => (
        <UiUserListItem onClick={selectChat} key={user.id} user={user} />
    ))
    : <ChatsList />

  return (
    <div className={cls(className, '')}>
      <div className='p-4 max-h-screen flex flex-col'>
      <NavHeader />
      <div className='pt-5 -mx-2 overflow-y-auto flex-1'>
          { list }
      </div>
      </div>
    </div>
  )
}