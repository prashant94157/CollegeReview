import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useState(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);
  return <div>DashboardScreen</div>;
};

export default DashboardScreen;
