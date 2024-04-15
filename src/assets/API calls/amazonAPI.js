import axios from 'axios';
import { POST } from './api.js'

export const uploadFile = async (image) => {
    // get amazon credentials
  const credentials = await POST('/amazon/get-credentials', { image_name: image.name });
  // console.log(credentials)

    // receive response
    const url = credentials.data.upload_url;

    // upload images
    const formData = new FormData();

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