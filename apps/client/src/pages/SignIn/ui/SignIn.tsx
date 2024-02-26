import { SignInForm } from '../../../widgets/SignInForm/ui/SignInForm';

interface SignInProps {
  className?: string
}

export const SignIn = ({ className }: SignInProps) => {

  return (
    <div className="bg-chat-bg h-screen flex justify-center items-center">
      <SignInForm />
    </div>
  )
}