import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';
import useAuth from '../hooks/useAuth';

const axiosPrivate = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        // Accept: '*/*',
    },
    paramsSerializer: (params) => queryString.stringify({ ...params }),
});

export default axiosPrivate;
