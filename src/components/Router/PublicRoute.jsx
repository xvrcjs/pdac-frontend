import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PublicRoute = () => {
  const { account, permissions } = useContext(AppContext);
  
  if (account) {
    if(permissions.view_permission){
      return <Navigate to={"/reg-updater/activity-logs"} replace />;
    }else{
      return <Navigate to={"/"} replace />;
    }
  }

  return (
    <Outlet />
  );
};

export default PublicRoute;