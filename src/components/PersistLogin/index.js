import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import usePrivateApi from '../../api/usePrivateApi';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUserSaved, setIsUserSaved] = useState(false);
    const { auth, setAuth, setIsUnexpired } = useAuth();

    const privateApi = usePrivateApi();

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        let isMounted = true;
        // setIsUnexpired(false);
        const getLocalStorage = () => {
            try {
                const userStore = localStorage.getItem('user');
                const access_token = localStorage.getItem('access_token');

                if (userStore && access_token) {
                    // setIsUserSaved(true);
                    const user = JSON.parse(userStore);
                    setAuth({ user, access_token });

                    isMounted && setIsUserSaved(true);
                }
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        !auth?.access_token ? getLocalStorage() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        if (!isLoading && isUserSaved) {
            // console.log(isLoading + '   ' + isUserSaved + auth?.access_token);
            checkToken();
        } else if (!isLoading && !isUserSaved) {
            setIsChecked(true);
        }
        // console.log(`isLoading: ${isLoading}`);
        // console.log('aT: ' + auth?.access_token);
    }, [isLoading]);

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        setAuth({});
        try {
            const response = await privateApi.logout();
            console.log('logout');
        } catch (err) {
            console.log(err);
        }
    };

    const checkToken = async () => {
        try {
            const response = await privateApi.checktoken();
            if (response.status === 401 || response.status === 403) {
                alert('session is expired!');
                logout();
            }
            if (response.status === 200) {
                setIsUnexpired(true);
                setIsChecked(true);
            }
        } catch (err) {
            console.log(err.response);
            if (err.status === 401 || err.status === 403) {
                // logout();
            }
        }
    };
    return <Outlet context={{ logout, isChecked }} />;
};

export default PersistLogin;
