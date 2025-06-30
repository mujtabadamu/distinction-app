import { Fragment } from 'react';

import { Navigate } from 'react-router-dom';

import { Loadable } from '../../utils/ComponentLoader';
import { useAuthSlice } from 'pages/auth/authSlice';

const Dashboard = Loadable<any>(
  () => import('../../pages/Dashboard'),
  'Dashboard'
);

const PrivateDashboard = () => {
  const { user: localUser, isAuthenticated } = useAuthSlice();
  const accessToken = localUser?.accessToken;
  const auth = !!(localUser && accessToken && isAuthenticated);

  return <Fragment>{auth ? <Dashboard /> : <Navigate to="/login" />}</Fragment>;
};

export default PrivateDashboard;
