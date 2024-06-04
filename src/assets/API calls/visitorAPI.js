import Toast from "../components/common/Toast.vue";
import { errorToast, redirect, refreshPage } from "../components/common/common";
import { GET } from "./api";

// generate token
export const generateToken = async (museum_id) => {
    const getToken = await GET('/visitor/generate-token', {museum_id: museum_id});

    if(getToken.data) {
        localStorage.setItem('visitor_token', getToken.data.visitor_token);
        localStorage.setItem('visitor_museum_id', museum_id);
        localStorage.setItem('visitor_token_expiry', new Date());

        redirect('/scan');
    } else {
        errorToast('Error generating token!', 'refresh')
    }
}