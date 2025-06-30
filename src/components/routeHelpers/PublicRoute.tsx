import { ReactNode, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthSlice } from 'pages/auth/authSlice';

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const { user: localUser, isAuthenticated } = useAuthSlice();
  const accessToken = localUser?.accessToken;
  const auth = !!(isAuthenticated && accessToken);
  return <Fragment>{auth ? <Navigate to="/home" /> : children}</Fragment>;
};

export default PublicRoute;
