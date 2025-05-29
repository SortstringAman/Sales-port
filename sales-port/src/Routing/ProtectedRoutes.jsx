import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element }) => {
  const token = localStorage.getItem('token');
  

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  return element;
};

export default ProtectedRoutes;
