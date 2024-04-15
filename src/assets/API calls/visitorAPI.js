import Toast from "../components/common/Toast.vue";
import { redirect, refreshPage } from "../components/common/common";
import { GET } from "./api";

// generate token
export const generateToken = async (museum_id) => {
    const getToken = await GET('/visitor/generate-token', {museum_id: museum_id});
    // console.log(getToken.data);

    if(getToken.data) {
        localStorage.setItem('visitor_token', getToken.data.visitor_token);
        localStorage.setItem('visitor_museum_id', museum_id);

        redirect('/scan');
    } else {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: 'Error generating token!',
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => refreshPage(), 1000);
    }
}