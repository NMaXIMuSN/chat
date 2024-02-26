import { createBrowserRouter } from "react-router-dom"
import { Home } from "../../pages/Home"
import { SignIn } from '../../pages/SignIn/ui/SignIn';
import { ProtectedRouteOnlyAuth, ProtectedRouteOnlyNotAuth } from "./routerProtected";
import { SignUp } from '../../pages/SignUp/ui/SignUp';
import { Chat } from '../../pages/Chat/ui/Chat';
 
export enum AppRoutes {
  HOME = "home",
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  PROFILE = "profile",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.SIGN_IN]: '/sign-in',
  [AppRoutes.SIGN_UP]: '/sign-up'
}

export const routeConfig = createBrowserRouter([
  {
    path: RoutePath.home,
    element: 
    <ProtectedRouteOnlyAuth>
      <Home />
    </ProtectedRouteOnlyAuth>,
    children: [
      {
        path: '/:chat',
        element: <Chat />
      }
    ]
  },
  {
    path: RoutePath.profile,
    element: <div>Profile</div>
  },
  {
    path: RoutePath["sign-in"],
    element: 
    <ProtectedRouteOnlyNotAuth>
      <SignIn />
    </ProtectedRouteOnlyNotAuth>,
  },
  {
    path: RoutePath["sign-up"],
    element: <ProtectedRouteOnlyNotAuth>
      <SignUp />
    </ProtectedRouteOnlyNotAuth>
  },
])
