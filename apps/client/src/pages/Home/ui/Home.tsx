import React, { useContext, useEffect } from 'react'
import cls from 'classnames'
import { MainLayout } from '../../../widgets/MainLayout/ui/MainLayout';
import { useSelector } from 'react-redux';
import { StateSchema } from '../../../app/providers/StoreProviders';
import { SocketContext } from '../../../app/providers/SocketContext/config/SocketContext';
import { Outlet } from 'react-router-dom';
interface HomeProps {
  className?: string
}


export const Home = ({ className }: HomeProps) => {
  const { user } = useSelector((state: StateSchema) => state.user)
  const { socket } = useContext(SocketContext) 

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('join_room', socket.id, user?.id)
      })
      socket.connect()
    }

    return () => {
      socket?.disconnect()
    }

  }, [socket, user])

  return (
    <MainLayout className={cls()}>
      <Outlet />
    </MainLayout>
  )
}