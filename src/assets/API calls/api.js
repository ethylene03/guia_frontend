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
 *          import { functionName } from '@/assets/API calls/apiAdmin.js
 * 
 *      In request function:
 *          const post = await functionName(endpoint, data);
 * 
 * Name Convention:
 *      1. Visitor - use prefix 'visitor' (example: await visitorPOST('/scan', data);)
 *      2. Admin - use prefix 'admin' (example: await adminPOST('/change-password', data);)
 *      3. Login - do not use any prefix (example: await POST('/admin/login', data);)
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
export const POST = async (endpoint, data) => {
    try {
        const response = await login.post(endpoint, data);
        return response;
    } catch (error) {
        return error;
    }
};


/**
 * ADMIN API CALLS
 */

// axios for any API in admin aside login (w/ authorization)
const apiAdmin = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Content-Type': 'application/json',
    },
});

apiAdmin.interceptors.request.use(
    (config) => {
        const token = getToken('admin');
        
        if(token)
            config.headers.Authorization = token;

        return config
    },
)

// get admin
export const adminGET = async (endpoint) => {
    try {
        if(!isExpired()) {
            const response = await apiAdmin.get('/admin' + endpoint);
            return response;
        } else 
            logout();
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
  
// post admin
export const adminPOST = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiAdmin.post('/admin' + endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// put admin
export const adminPUT = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiAdmin.put('/admin' + endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// delete admin
export const adminDELETE = async (endpoint) => {
    try {
        if(!isExpired()) {
            const response = await apiAdmin.delete('/admin' + endpoint);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// update admin
export const adminUPDATE = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiAdmin.patch('/admin' + endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};


/**
 * VISITOR API CALLS
 */

// axios for any API in visitor (w/ authorization)
const apiVisitor = axios.create({
    baseURL,
    headers: {
        'X-API-KEY': APIKey,
        'Authorization': getToken('visitor'),
        'Content-Type': 'application/json',
    },
});

// get visitor
export const visitorGET = async (endpoint) => {
    try {
        if(!isExpired()) {
            const response = await apiVisitor.get(endpoint);
            return response;
        } else
            logout();
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
  
// post visitor
export const visitorPOST = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiVisitor.post(endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// put visitor
export const visitorPUT = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiVisitor.put(endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// delete visitor
export const visitorDELETE = async (endpoint) => {
    try {
        if(!isExpired()) {
            const response = await apiVisitor.delete(endpoint);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
  
// update visitor
export const visitorUPDATE = async (endpoint, data) => {
    try {
        if(!isExpired()) {
            const response = await apiVisitor.patch(endpoint, data);
            return response;
        } else
            logout();
    } catch (error) {
        return error;
    }
};
