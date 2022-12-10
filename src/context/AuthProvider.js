import { createContext, useEffect, useState } from 'react';
// import useCheckToken from '../hooks/useCheckToken';
import usePrivateApi from '../api/usePrivateApi';
import useLogout from '../hooks/useLogout';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isUnexpired, setIsUnexpired] = useState(false);
    return (
        <AuthContext.Provider value={{ auth, setAuth, isUnexpired, setIsUnexpired }}>{children}</AuthContext.Provider>
    );
};
export default AuthContext;
