import { RouterProvider } from 'react-router-dom'
import { routeConfig } from './router'

interface RouterProviderProps {
  className?: string
}

export const AppRouterProvider = ({ className }: RouterProviderProps) => {
  return (
    <RouterProvider router={routeConfig}/>
  )
}