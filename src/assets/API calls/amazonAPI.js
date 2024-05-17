import axios from 'axios';
import { authPOST } from './api.js';

export const uploadFile = async (image) => {
    // get amazon credentials
    const credentials = await authPOST('/amazon/get-credentials', { image_name: image.name });

    // receive response
    const url = credentials.data.upload_url;

    const response = await axios.put(url, image, {
        headers: {
            'Content-Type': 'image/jpeg',
        }
    });

    // receive response
    if(response.error) 
        return false;
    else
        return true;
}