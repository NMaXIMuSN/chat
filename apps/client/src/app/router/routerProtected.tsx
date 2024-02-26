import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes, RoutePath } from "./router";
import { getIsAuth } from '../../entities/user/model/selectors/getIsAuth/getIsAuth';
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRouteOnlyAuth = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector(getIsAuth)
  

  if (!isAuth) {
    return <Navigate to={RoutePath[AppRoutes.SIGN_IN]} replace />;
  }

  return children;
};

export const ProtectedRouteOnlyNotAuth = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector(getIsAuth)


  if (isAuth) {
    return <Navigate to={RoutePath[AppRoutes.HOME]} replace />;
  }

  return children;
};
