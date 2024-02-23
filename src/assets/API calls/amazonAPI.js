import axios from 'axios';

export const uploadFile = async (image) => {
    // get amazon credentials
    const credentials = await POST('/amazon/get-credentials', {image_name: image.name});

    // receive response
    const url = credentials.data.url;
    const fields = credentials.data.fields;

    // upload images
    const formData = new FormData();
    formData.append('Content-Type', 'image/jpeg');
    formData.append('key', fields.key);
    formData.append('AWSAccessKeyId', fields.AWSAccessKeyId);
    formData.append('policy', fields.policy);
    formData.append('signature', fields.signature);
    formData.append('file', image);

    const response = await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    // receive response
    if(response.error) 
        return false;
    else
        return true;
}