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
import { getToken, isExpired, logout } from '../components/common';

/** Fetch URL and API Key **/ 
const baseURL = import.meta.env.VITE_API_URL;
const APIKey = import.meta.env.VITE_API_KEY; 


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
  
// post LOGIN
export const loginPOST = async (endpoint, data) => {
    try {
        const response = await login.post(endpoint, data);
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
            // toast error
            logout();
        }
    },
)

// get
export const GET = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
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