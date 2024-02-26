import { ReactNode } from "react"
import { MainLayoutNav } from "./MainLayoutNav"
interface MainLayoutProps {
  className?: string
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='grid grid-cols-[3fr_7fr] bg-nav-bg min-h-screen text-white font-main'>
    <MainLayoutNav className="h-screen"/>
    <div className='bg-chat-bg rounded-lg h-screen'>
      {
        children
      }
    </div>
  </div>
  )
}