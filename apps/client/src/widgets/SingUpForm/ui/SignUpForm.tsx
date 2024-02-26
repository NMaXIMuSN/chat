import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from 'react-redux';
import { userActions } from '../../../entities/user/model/slice/UserSlice';
import { SignUpResponse } from '../../../shared/config/api/userRequets';
import { UiInput } from '../../../shared/ui/UiInput';
import { UiButton } from '../../../shared/ui/UiButton';
import { UILink } from '../../../shared/ui/UILink';

interface SignUpFormProps {
  className?: string
}

export const SignUpForm = ({ className }: SignUpFormProps) => {
  const [ userName, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()


  const navigate = useNavigate()

  const handleOnChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e?.target?.value)
  }

  const handleOnChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e?.target?.value)
  }

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      
      const { data } = await SignUpResponse(userName, password)
      dispatch(userActions.setUser(data))
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-8 py-4 bg-nav-bg rounded-xl text-white">
      <div className="text-center font-semibold text-lg">
        SignUp Form
      </div>
      <form className="mt-2 flex flex-col gap-3" onSubmit={handleOnSubmit}>
        <UiInput label="UserName" type="text" name="username" value={userName} onChange={handleOnChangeUserName}/>
        <UiInput label="Password" type="password" name="password" value={password} onChange={handleOnChangePassword}/>
        <UiButton type="submit">SingUn</UiButton>
        <UILink to={'/sign-in'} className='text-center'>SignIn</UILink>
      </form>
    </div>
  )
}