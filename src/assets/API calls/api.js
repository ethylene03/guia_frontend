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
 *      2. Admin - no prefix (example: await POST('/admin/change-password', data);)
 *      3. Login - use prefix 'login' (example: await loginPOST('/admin/login', data);)
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
const expressURL = import.meta.env.VITE_API_URL_EXPRESS_LOCAL;


/**
 * LOGIN API CALLS
 */

// axios for login (no authorization)
const login = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

login.interceptors.response.use(
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
export const loginPOST = async (endpoint, data) => {
    try {
        const response = await login.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};

// get
export const loginGET = async (endpoint, data) => {
    try {
        const response = await login.get(endpoint, {params: data});
        return response;
    } catch (error) {
        return error;
    }
};

/**
 * LOGIN API CALLS EXPRESS
 */

// axios for login (no authorization)
const express = axios.create({
    baseURL: expressURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

express.interceptors.response.use(
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
export const expressPOST = async (endpoint, data) => {
    console.log(expressURL)
    try {
        const response = await express.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};

// get
export const expressGET = async (endpoint, data) => {
    try {
        const response = await express.get(endpoint, {params: data});
        return response;
    } catch (error) {
        return error;
    }
};


/**
 * OTHER API CALLS
 */

// axios for any API aside login (w/ authorization)
const api = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
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

api.interceptors.response.use(
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
export const GET = async (endpoint, data) => {
    try {
        const response = await api.get(endpoint, {params: data});
        return response;
    } catch (error) {
        return error;
    }
};
  
// post
export const POST = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};
  
// put
export const PUT = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};
  
// delete
export const DELETE = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response;
    } catch (error) {
        return error;
    }
};
  
// update 
export const UPDATE = async (endpoint, data) => {
    try {
        const response = await api.patch(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};