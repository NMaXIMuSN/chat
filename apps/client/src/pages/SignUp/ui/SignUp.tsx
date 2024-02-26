import { SignUpForm } from '../../../widgets/SingUpForm';

interface SignUpProps {
  className?: string
}

export const SignUp = ({ className }: SignUpProps) => {

  return (
    <div className="bg-chat-bg h-screen flex justify-center items-center">
      <SignUpForm />
    </div>
  )
}