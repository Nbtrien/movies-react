import useAxiosPrivate from '../api/useAxiosPrivate';
import usePrivateApi from '../api/usePrivateApi';
import useAuth from './useAuth';
import useLogout from './useLogout';

const useCheckToken = () => {
    const { auth, setAuth } = useAuth();
    const privateApi = usePrivateApi();
    const logout = useLogout();
    // const axiosPrivate = useAxiosPrivate();

    const checkToken = async () => {
        try {
            const response = await privateApi.checktoken();
            // console.log(response.status);
            if (response.status == 401 || response.status == 403) {
                console.log('loix' + response.status);
                logout();
            }
        } catch (err) {
            console.log(err.response);
            if (err.status == 401 || err.status == 403) {
                console.log('loix' + err.status);
                // logout();
            }
        }
    };
    return checkToken;
};

export default useCheckToken;
