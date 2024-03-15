import { loginPOST } from "./api";
import { refreshPage } from '@/assets/components/common/common.js';
import moment from 'moment';

export const submitLogin = async (credentials) => {
    if(!credentials.admin_username && !credentials.admin_password)
        return "Username and Password are required.";

    else if(!credentials.admin_username)
        return "Username is required.";

    else if(!credentials.admin_password)
        return "Password is required.";
    
    
    
    const submit = await loginPOST('/admin/login', credentials);

    // check if success
    if(submit?.status === 200) {
        const post = submit.data;

        // store locally
        localStorage.setItem('admin_id', post.admin_id);
        localStorage.setItem('admin_museum_id', post.museum_id);
        localStorage.setItem('admin_token', 'Token ' + post.token);
        localStorage.setItem('token_expiry', moment.utc(post.token_expires).local().format('MM-DD-YYYY h:mm:ss A'));
        localStorage.setItem('username', credentials.admin_username);

        // redirect to home
        refreshPage();

    } else {
        return submit?.response.data.detail;
    }
}