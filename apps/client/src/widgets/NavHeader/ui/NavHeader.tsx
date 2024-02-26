import { useDispatch } from 'react-redux';
import { SignOutButton } from '../../../entities/user/ui/SignOutButton';
import { UiInput } from '../../../shared/ui/UiInput';
import { ChangeEvent } from 'react';
import { SearchUsersByUserNameResponse } from '../../../shared/config/api/userRequets';
import { searchUsersActions } from '../../../entities/searchUsers/model/slice/SearchUsersClice';

interface NavHeaderProps {
  className?: string
}

export const NavHeader = ({ className }: NavHeaderProps) => {
  const dispatch = useDispatch()

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      dispatch(searchUsersActions.setUsers([]))
      return
    }
    await SearchUsersByUserNameResponse(e.target.value)
      .then(({data}) => {
        dispatch(searchUsersActions.setUsers(data))
      })
  }
  return (
    <div className=''>
      <div className="text-sm">
        Chat
        <SignOutButton />
      </div>
      <UiInput
        onChange={handleOnChange}
      />
    </div>
  )
}