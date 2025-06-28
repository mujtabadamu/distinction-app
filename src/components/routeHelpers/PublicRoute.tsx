import { ReactNode, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '../../redux/auth/selectors';
import { getLocalAccessToken } from '../../utils/helpers';

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = getLocalAccessToken();
  const auth = !!(isAuthenticated && accessToken);
  return <Fragment>{auth ? <Navigate to="/home" /> : children}</Fragment>;
};

export default PublicRoute;
