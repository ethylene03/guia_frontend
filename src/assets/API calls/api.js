/**
 * For API Calls
 * 
 * Summary:
 *      This is where the basic fetching for axios is done.
 * 
 * Required:
 *      1. Endpoint - link
 *      2. Data - data to pass
 * 
 * To use:
 *      In <script> tags:
 *          import { functionName } from '@/assets/API calls/api.js
 * 
 *      In request function:
 *          const post = await functionName(endpoint, data);
 * 
 * Name Convention:
 *      1. Visitor - no prefix (example: await visitorPOST('/scan', data);)
 *      2. Admin - no prefix (example: await authPOST('/admin/change-password', data);)
 *      3. Login - use prefix 'login' (example: await POST('/admin/login', data);)
 * 
 * Functions Available:
 *      1. GET - (endpoint)
 *      2. POST - (endpoint, data)
 *      3. PUT - (endpoint, data)
 *      4. DELETE - (endpoint)
 *      5. UPDATE - (endpoint, data)
 */

import axios from 'axios';
import { getToken, isExpired, logout } from '../components/common/common';
import { useModal } from 'vue-final-modal';
import ToastVue from '../components/common/Toast.vue';

/** Fetch URL and API Key **/ 
const baseURL = import.meta.env.VITE_API_URL;
const APIKey = import.meta.env.VITE_API_KEY; 

/**
 * LOGIN API CALLS
 */

// axios for login (no authorization)
const noauthAPI = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

noauthAPI.interceptors.response.use(
    response => response,
    error => {
        if(error.code === "ERR_NETWORK") {
            const  {open, close} = useModal({
                component: ToastVue,
                attrs: {
                    type: 'error',
                    message: 'Server Error',
                    subtext: 'Please try again later.'
                }
            })

            open();
        } else
            return error;
    }
)
  
// post LOGIN
export const POST = async (endpoint, data) => {
    try {
        const response = await noauthAPI.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};

// get
export const GET = async (endpoint, data) => {
    try {
        const response = await noauthAPI.get(endpoint, {params: data});
        return response;
    } catch (error) {
        return error;
    }
};

/**
 * OTHER API CALLS
 */

// axios for any API (w/ authorization)
const authAPI = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

authAPI.interceptors.request.use(
    (config) => {
        if(!isExpired()) {
            var token = "";

            if(getToken('admin'))
                token = getToken('admin');
            else
                token = getToken('visitor');
        
            if(token)
                config.headers.Authorization = token;

            return config
        } else {
            // halt fetching
            return Promise.reject();
        }
    },
    (error) => {
        return Promise.reject(error);
    }
)

authAPI.interceptors.response.use(
    response => response,
    error => {
        // console.log(error);
        if(error.code === "ERR_NETWORK" || error.response.status === 500) {
            const  {open, close} = useModal({
                component: ToastVue,
                attrs: {
                    type: 'error',
                    message: 'Server Error',
                    subtext: 'Please try again later.'
                }
            })

            open();
        } else if(error.response.data.detail === "Invalid Token") {
            const {open, close} = useModal({
                component: ToastVue,
                attrs: {
                    type: 'warning',
                    message: 'Token expired!',
                    subtext: 'Please login again to continue.'
                }
            })

            open();
            logout();
        } else
            return error;
    }
)

// get
export const authGET = async (endpoint, data) => {
    try {
        const response = await authAPI.get(endpoint, {params: data});
        return response;
    } catch (error) {
        return error;
    }
};
  
// post
export const authPOST = async (endpoint, data) => {
    try {
        const response = await authAPI.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};