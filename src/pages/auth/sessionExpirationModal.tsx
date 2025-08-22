import React from 'react';
import { useAppDispatch } from '../../store/store';
import { Modal } from 'antd';

import { hideSessionExpiryMessage, logout, useAuthSlice } from './authSlice';

const SessionExpirationModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSessionExpired } = useAuthSlice();
  const currentPath = window.location.pathname;

  const handleOk = () => {
    dispatch(hideSessionExpiryMessage());
    if (currentPath !== '/login') {
      dispatch(logout());
      // Redirect to login page after logout
      window.location.href = '/login';
    }
  };

  return (
    <Modal
      title="Session Expired"
      open={isSessionExpired}
      onOk={handleOk}
      closable={false}
      centered
      okText={currentPath !== '/login' ? 'Logout' : 'Close'}
      cancelButtonProps={{ style: { display: 'none' } }}
      className="session-expired-modal"
    >
      Session has expired or currently in use by another device
    </Modal>
  );
};

export default SessionExpirationModal;
