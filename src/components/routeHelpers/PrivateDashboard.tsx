import { Fragment } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectIsAuthenticated } from '../../redux/auth/selectors';
import { getLocalAccessToken, getLocalUser } from '../../utils/helpers';
import { Loadable } from '../../utils/ComponentLoader';

const Dashboard = Loadable<any>(
  () => import('../../pages/Dashboard'),
  'Dashboard'
);

const PrivateDashboard = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = getLocalAccessToken();
  const localUser = getLocalUser();
  const auth = !!(localUser && accessToken && isAuthenticated);

  return <Fragment>{auth ? <Dashboard /> : <Navigate to="/login" />}</Fragment>;
};

export default PrivateDashboard;
