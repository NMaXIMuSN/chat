import { ReactNode } from 'react'
import { SocketContext } from '../config/SocketContext'
import { io } from 'socket.io-client'

interface SocketProviderProps {
  children?: ReactNode
}


const socket = io('http://localhost:3000', {
  autoConnect: false,
})


export const SocketProvider = ({ children }: SocketProviderProps) => {
  
  const value = {
    socket
  }
  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}