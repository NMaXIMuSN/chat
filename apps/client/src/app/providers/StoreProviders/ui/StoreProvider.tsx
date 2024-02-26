import { ReactNode } from "react"
import { createConfigureStore } from '../config/store'
import { Provider } from 'react-redux'
import { StateSchema } from "../config/StateSchema"
interface StoreProviderProps {
  children?: ReactNode
  initialState?: StateSchema
}


export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  const store = createConfigureStore(initialState)
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}