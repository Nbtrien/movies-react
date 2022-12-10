import { useLocation, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import BouncingLoader from '../BoucingLoader';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const { isChecked } = useOutletContext();

    return allowedRoles?.includes(auth?.user?.role) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to='/' />
    ) : isChecked === true ? (
        <Navigate to='/login' state={{ from: location }} replace />
    ) : (
        <BouncingLoader />
    );
};

export default RequireAuth;
