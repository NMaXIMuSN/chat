import { SignOutResponse } from '../../../shared/config/api/userRequets';
import { useDispatch } from "react-redux"
import { userActions } from "../model/slice/UserSlice"
import { useNavigate } from 'react-router-dom';
import { AppRoutes, RoutePath } from '../../../app/router/router';

interface SignOutButtonProps {
  className?: string
}

export const SignOutButton = ({ className }: SignOutButtonProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOnClick = async () => {
    await SignOutResponse()
    dispatch(userActions.resetUser())
    navigate(RoutePath[AppRoutes.SIGN_IN])
  }
  return (
    <button onClick={handleOnClick}>
      SignOut
    </button>
  )
}