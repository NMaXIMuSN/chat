import { AppRouterProvider } from './router/RouterProvider';
import { SocketProvider } from './providers/SocketContext';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetUserInfoResponse } from '../shared/config/api/userRequets';
import { userActions } from '../entities/user/model/slice/UserSlice';

export function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    GetUserInfoResponse()
      .then(({ data }) => {
        dispatch(userActions.setUser(data));
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <SocketProvider>
      <AppRouterProvider />
    </SocketProvider>
  );
}

export default App;
