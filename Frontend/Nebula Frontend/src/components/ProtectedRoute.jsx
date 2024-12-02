import React, { Children, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../context/context';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return element;
};

export default ProtectedRoute;
