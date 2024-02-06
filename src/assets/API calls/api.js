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
 */

import axios from 'axios';

/** Fetch URL and API Key **/ 
const baseURL = import.meta.env.VITE_API_URL;
const APIKey = import.meta.env.VITE_API_KEY; 


const api = axios.create({
  baseURL,
  headers: {
    'Authorization': APIKey,
    'Content-Type': 'application/json',
  },
});

// get
export const GET = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
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
