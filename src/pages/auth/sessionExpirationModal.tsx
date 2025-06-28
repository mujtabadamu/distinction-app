import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { selectIsSessionExpired } from 'redux/auth/selectors';
import { hideSessionExpiryMessage } from 'redux/auth/reducer';
import { logout } from 'utils/helpers';

const SessionExpirationModal: React.FC = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(selectIsSessionExpired);
  const currentPath = window.location.pathname;

  const handleOk = () => {
    dispatch(hideSessionExpiryMessage());
    if (currentPath !== '/login') {
      logout();
    }
  };

  return (
    <Modal
      title="Session Expired"
      open={isVisible}
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
