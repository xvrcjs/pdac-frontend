import React, { useContext ,useEffect} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Layout from '../Layout';

const PrivateRoute = () => {
  const { account,lastVisitedUrl ,setLastUrl} = useContext(AppContext);
  const location = useLocation();
  localStorage.setItem('lastVisitedUrl', lastVisitedUrl);

  useEffect(() => {
    setLastUrl(location.pathname);
  }, [location.pathname, setLastUrl]);
  
  if (!account) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;