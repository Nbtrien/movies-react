import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import axiosPrivate from './axiosPrivate';
import useRefresh from './useRefresh';

const useAxiosPrivate = () => {
    const { auth, setAuth } = useAuth();
    const refresh = useRefresh();
    let isLoggingOut = false;

    var access_token = null;
    var i = 0;

    if (auth?.access_token) {
        access_token = auth.access_token;
    }

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            async (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${access_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                // console.log(response);
                return response;
            },
            async (error) => {
                // throw error;
                // console.log(error.response);
                if (error.response.status == 401 || error.response.status == 403) {
                    // alert('session is expired!');
                    // console.log(error.response);
                    // localStorage.removeItem('user');
                    // localStorage.removeItem('access_token');
                    // setAuth({});
                }
                // const prevRequest = error?.config;
                // if (error?.response?.status === 403 && !prevRequest?.sent) {
                //     prevRequest.sent = true;
                //     prevRequest.headers['Authorization'] = `Bearer ${auth.access_token}`;
                //     return axiosPrivate(prevRequest);
                // }
                return error?.response;
            },
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
