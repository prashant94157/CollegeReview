import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, minUserRequirement }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (
    !userInfo ||
    (minUserRequirement && minUserRequirement !== userInfo.userType)
  ) {
    return <Navigate to='/' replace />;
  }

  return <Component />;
};

export default PrivateRoute;
