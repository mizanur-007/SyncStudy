import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import LoaderPage from '../Pages/LoaderPage/LoaderPage';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <LoaderPage></LoaderPage>
    }
    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
       }
       else{
        return children;
       }
};

export default PrivateRoute;